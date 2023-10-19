import jwt from "jsonwebtoken";
import { findVideoIdByUser, updateStats, insertStats } from "@/lib/db/hasura";

export default async function stats(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send({ msg: "Forbidden" });
    } else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;
      if (videoId) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;

        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;

          if (doesStatsExist) {
            // update data
            const response = await updateStats(token, {
              userId,
              videoId,
              watched,
              favourited,
            });
            res.send({ data: response });
          } else {
            // add data
            const response = await insertStats(token, {
              userId,
              videoId,
              watched,
              favourited,
            });
            res.send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            res.send({ findVideo });
          } else {
            res.status(404);
            res.send({ user: null, msg: "Video not found" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occured /stats", error);
    res.status(500).send({ done: false, error: error?.message });
  }
}
