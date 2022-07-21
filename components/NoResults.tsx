import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface Props {
  text: string;
}

const NoResult = ({ text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {text === "まだコメントはありません" ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
