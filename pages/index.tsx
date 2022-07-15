import type { NextPage } from "next";
import axios from "axios";

import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

interface Props {
  videos: Video[];
}

const Home: NextPage<Props> = ({ videos }) => {
  console.log(videos);
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

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/post");

  return {
    props: {
      videos: data,
    },
  };
};
