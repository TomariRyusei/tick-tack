import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

// ファイルアップロード
const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [topic, setTopic] = useState<string>(topics[0].name);
  const [isSavingPost, setIsSavingPost] = useState<boolean>(false);
  const userProfile = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(file.type)) {
      setWrongFileType(false);
      setIsLoading(true);

      client.assets
        .upload("file", file, {
          contentType: file.type,
          filename: file.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  // 投稿
  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setIsSavingPost(true);

      // sanityに保存するデータを形成
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            // すでにアップロードされているビデオのID
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post("http://localhost:3000/api/post", document);

      router.push("/");
    }
  };

  // 投稿取り消し
  const handleDiscard = () => {
    setIsSavingPost(false);
    setVideoAsset(undefined);
    setCaption("");
    setTopic("");
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[85vh] w-[75%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">動画をアップロード</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p className="text-center text-3xl text-red-400 font-semibold">
                アップロード中...
              </p>
            ) : (
              <div>
                {videoAsset ? (
                  <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                    <video
                      className="rounded-xl h-[462px] mt-16 bg-black"
                      controls
                      loop
                      src={videoAsset?.url}
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          投稿する動画を選択
                        </p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 または WebM または ogg <br />
                        解像度 720x1280以上 <br />
                        10 分まで <br />
                        容量 2GB以下
                      </p>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        ファイルを選択
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        uploadVideo(e)
                      }
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                MP4 または WebM または ogg形式の動画を選択してください
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">
            この動画を簡単に説明してください
          </label>
          <input
            type="text"
            className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
            value={caption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCaption(e.target.value)
            }
          />

          <label className="text-md font-medium ">トピックを選択</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setTopic(e.target.value);
            }}
            className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {
                handleDiscard();
              }}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              取り消す
            </button>
            <button
              onClick={() => {
                handlePost();
              }}
              type="button"
              className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              {isSavingPost ? "投稿中..." : "投稿する"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
