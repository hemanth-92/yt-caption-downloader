import env from "./env.ts";

export interface YoutubeResponseError {
  error: {
    message: string;
  };
}

export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Item {
  kind: ItemKind;
  etag: string;
  id: ID;
}

export interface ID {
  kind: IDKind;
  videoId: string;
}

export enum IDKind {
  YoutubeVideo = "youtube#video",
}

export enum ItemKind {
  YoutubeSearchResult = "youtube#searchResult",
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export async function listChannelVideos(channelId: string) {
  const params = new URLSearchParams({
    key: env?.YOUTUBE_API,
    type: "video",
    maxResults: "50",
    channelId,
  });
  const url = `https://www.googleapis.com/youtube/v3/search?${params}`;
  console.log(url);
  const response = await fetch(url);

  if (response.ok) {
    const result = (await response.json()) as YoutubeSearchResponse;
    return result;
  }
  const errorJson = (await response.json()) as YoutubeResponseError;
  throw new Error(errorJson.error.message);
}
