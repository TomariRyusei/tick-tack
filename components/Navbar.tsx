import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../utils/ticktak-logo.png";
import { createOrGetUser } from "../utils/index";
import useAuthStore from "../store/authStore";
import { User } from "../types";

const Navbar = () => {
  const { userProfile, storeUser, removeUser }: any = useAuthStore();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[30px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="アカウントと動画を検索"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">アップロード</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <>
                  {/* 動画投稿者のプロフィール画像 */}
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="user-profile"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, storeUser)}
            onError={() => console.log("Google auth error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
