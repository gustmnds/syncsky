import { RegisterModule } from "@syncsky/chat-api";
import { TwitchChatModule } from "../twitch-chat-module";

RegisterModule({
    platform: "twitch",
    async register(chatModule) {
        TwitchChatModule.register(chatModule, {
            channel: process.env.TWITCH_CHANNEL!,
            channelId: process.env.TWITCH_CHANNEL_ID!,
            clientId: process.env.TWITCH_CLIENT_ID!,
            accessToken: process.env.TWITCH_ACCESS_TOKEN!,
        });
    },
});
