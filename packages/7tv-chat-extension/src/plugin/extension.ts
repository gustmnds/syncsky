import { RegisterExtension } from "@syncsky/chat-api";
import { SevenTVChatExtension } from "..";

RegisterExtension({
    name: "7TV",
    async register(chatExtension) {
        SevenTVChatExtension.register(chatExtension, {
            channelId: process.env.TWITCH_CHANNEL_ID!
        });
    },
});
