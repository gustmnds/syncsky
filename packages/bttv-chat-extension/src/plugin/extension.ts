import { RegisterExtension } from "@syncsky/chat-api";
import { BTTVChatExtension } from "../bttv-extension";

RegisterExtension({
    name: "BTTV",
    async register(chatExtension) {
        BTTVChatExtension.register(chatExtension, {
            channelId: process.env.TWITCH_CHANNEL_ID!
        });
    },
});
