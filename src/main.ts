import env from "./env.ts";
import { listChannelVideos } from "./youtube.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(env.YOUTUBE_CHANNEL_ID);
  for (const channelId of env.YOUTUBE_CHANNEL_ID) {
    const videos = await listChannelVideos(channelId);
    console.log(videos);
  }
}
