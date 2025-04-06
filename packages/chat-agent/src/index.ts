import { TwitchChatModule } from "@syncsky/twitch-chat-module";
import { ServerManager } from "./server";
import { BTTVChatExtension } from "@syncsky/bttv-chat-extension";
import { YoutubeChatModule } from "@syncsky/youtube-chat-module";

async function main() {
    const server = new ServerManager();
    //TwitchChatModule.register(server.chatManager.moduleManager, {
    //    channel: process.env.TWITCH_CHANNEL!,
    //    channelId: process.env.TWITCH_CHANNEL_ID!,
    //    clientId: process.env.TWITCH_CLIENT_ID!,
    //    accessToken: process.env.TWITCH_ACCESS_TOKEN!,
    //});
    await YoutubeChatModule.register(server.chatManager.moduleManager, {
        channelId: process.env.YOUTUBE_CHANNEL_ID!
    });
    //server.chatManager.extensionManager.register(new BTTVChatExtension(process.env.TWITCH_CHANNEL_ID!));
    server.listen();
    console.log("server running");
}

main();

