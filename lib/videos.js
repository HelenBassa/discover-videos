import videoTestData from "@/data/videos.json";
import { getWatchedVideos } from "@/lib/db/hasura";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
  const response = await fetch(`${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`);

  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    const isDev = JSON.parse(process.env.DEVELOPMENT);
    console.log({ isDev });
    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        id,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        publishTime: item.snippet.publishedAt,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics ? item.statistics.viewCount : 0,
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

const maxResults = "25";

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = (regionCode) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}`;

  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (id) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;

  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (token, userId) => {
  const videos = await getWatchedVideos(token, userId);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};
