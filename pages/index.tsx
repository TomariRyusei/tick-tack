import type { NextPage } from "next";
import axios from "axios";

import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

interface Props {
  videos: Video[];
}

const Home = ({ videos }: Props) => {
  return (
    <div className="text-3xl font-bold underlineflex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let res = null;

  // トピックが選択されている場合はトピックをキーに検索
  if (topic) {
    res = await axios.get(`${BASE_URL}/api/topic/${topic}`);
  } else {
    res = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: res.data,
    },
  };
};
