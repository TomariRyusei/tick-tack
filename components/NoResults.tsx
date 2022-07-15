import React from "react";
import { NextPage } from "next";

interface Props {
  text: string;
}

const NoResult: NextPage<Props> = () => {
  return <div>NoResult</div>;
};

export default NoResult;
