import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

import { client } from "../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;
    const data = like
      ? // いいねなら
        await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          // likes配列の最後尾に追加
          .insert("after", "likes[-1]", [{ _key: uuid(), _ref: userId }])
          .commit()
      : // いいね解除なら
        await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
