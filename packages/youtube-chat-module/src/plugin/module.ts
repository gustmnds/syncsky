import { RegisterModule } from "@syncsky/chat-api";
import { YoutubeChatModule } from "../youtube-chat-module";

RegisterModule({
    platform: "youtube",
    async register(chatModule) {
        YoutubeChatModule.register2(chatModule, {
            channelId: process.env.YOUTUBE_CHANNEL_ID!,
            liveId: process.env.YOUTUBE_LIVE_ID
        });
    },
});
