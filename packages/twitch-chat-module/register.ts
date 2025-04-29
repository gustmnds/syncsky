import { RegisterPlugin } from "@syncsky/chat-api";

RegisterPlugin({
    modules: [
        {
            platform: "twitch",
            async register(chatModule) {
                const { TwitchChatModule } = require("./src/twitch-chat-module");
                TwitchChatModule.register2(chatModule, {
                    channel: process.env.TWITCH_CHANNEL!,
                    channelId: process.env.TWITCH_CHANNEL_ID!,
                    clientId: process.env.TWITCH_CLIENT_ID!,
                    accessToken: process.env.TWITCH_ACCESS_TOKEN!,
                });
            },
        }
    ],
    ui(manager) {
        const { registerNotifications } = require("./src/ui");
        registerNotifications(manager);
    }
});
