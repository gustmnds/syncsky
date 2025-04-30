import { createServer } from "http";
import { PluginManager } from "@syncsky/chat-api";
import { app } from "./api";
import { APP_PORT } from "./settings";
import { ServerManager } from "./server";
import { loadExtension, loadModule } from "./plugin-loader";
import { PluginResolver } from "./plugins/plugin-resolver";

async function main() {
    const httpServer = createServer(app);
    const server = new ServerManager(httpServer);
    
    PluginResolver.searchPlugins();

    PluginManager.setHandler({
        moduleHandler: loadModule.bind(null, server.chatManager),
        extensionHandler: loadExtension.bind(null, server.chatManager)
    });

    for (const plugin of PluginResolver.plugins) {
        const moduleEntryPoint = plugin.entryPoints["module"];
        if (moduleEntryPoint) {
            require(moduleEntryPoint);
        }

        const extensionEntryPoint = plugin.entryPoints["extension"];
        if (extensionEntryPoint) {
            require(extensionEntryPoint);
        }
    }

    httpServer.listen(APP_PORT);
    console.log("agent listenning");
}

main();

/*
TwitchChatModule.register(server.chatManager.moduleManager, {
    channel: process.env.TWITCH_CHANNEL!,
    channelId: process.env.TWITCH_CHANNEL_ID!,
    clientId: process.env.TWITCH_CLIENT_ID!,
    accessToken: process.env.TWITCH_ACCESS_TOKEN!,
});

await YoutubeChatModule.register(server.chatManager.moduleManager, {
    channelId: process.env.YOUTUBE_CHANNEL_ID!,
    liveId: process.env.YOUTUBE_LIVE_ID
});

BTTVChatExtension.register(server.chatManager.extensionManager, {
    channelId: process.env.TWITCH_CHANNEL_ID!
});

SevenTVChatExtension.register(server.chatManager.extensionManager, {
    channelId: process.env.TWITCH_CHANNEL_ID!
})
*/
