import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../utils/client";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    // ユーザープロフィール情報
    const user = await client.fetch(singleUserQuery(userId));
    // ユーザーが投稿した動画
    const userVideos = await client.fetch(userCreatedPostsQuery(userId));
    // ユーザーがいいねした動画
    const userLikedVideos = await client.fetch(userLikedPostsQuery(userId));

    const data = { user: user[0], userVideos, userLikedVideos };

    res.status(200).json(data);
  }
}
