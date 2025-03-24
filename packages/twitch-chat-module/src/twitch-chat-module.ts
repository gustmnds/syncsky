import { ChatEmoji, ChatModule, ChatModuleManager } from "@syncsky/chat-api";
import { StaticAuthProvider } from "@twurple/auth"
import { ChatClient, ChatMessage } from "@twurple/chat"
import { ApiClient } from "@twurple/api"
import { TwitchBadgeClient } from "./twitch-badge-client";
import { getColorFromString } from "./utils";

interface TwitchChatSettings {
    clientId: string;
    accessToken: string;
    channel: string;
}

export class TwitchChatModule {

    private constructor(
        private chatModule: ChatModule,
        private readonly chatClient: ChatClient,
        private readonly badgeClient: TwitchBadgeClient,
        private readonly channel: string
    ) {
        this.setupModule();
    }

    public static register(chatModuleManager: ChatModuleManager, opts: TwitchChatSettings) {
        const authProvider = new StaticAuthProvider(opts.clientId, opts.accessToken);
        const chatClient = new ChatClient({ authProvider, channels: [opts.channel] });
        const apiClient = new ApiClient({ authProvider });
        const badgeClient = new TwitchBadgeClient(apiClient);
        const chatModule = chatModuleManager.createModule({ platform: "twitch" });

        return new TwitchChatModule(chatModule, chatClient, badgeClient, opts.channel);
    }

    private setupMessageHandler() {
        this.chatClient.onMessage((channel, user, text, message) => {
            console.log(message);
            this.chatModule.addMessage({
                messageId: message.id,
                authorId: message.userInfo.userId,
                authorColor: message.userInfo.color || getColorFromString(message.userInfo.userId),
                authorName: message.userInfo.displayName,
                badges: this.badgeClient.getBadges(message.userInfo.badges),
                content: this.parseTextEmojis(message),
            });
        });

        this.chatClient.onBan((channel, user, msg) => {
            if (!msg.targetUserId) return;
            this.chatModule.removeMessagesByAuthorId(msg.targetUserId);
        })

        this.chatClient.onMessageRemove((channel, messageId) => {
            this.chatModule.removeMessageById(messageId);
        });

        this.chatClient.onChatClear(() => {
            this.chatModule.removeAllMessages();
        });
    }

    private parseTextEmojis(message: ChatMessage) {
        const parts: Array<string | ChatEmoji> = [];

        const emotes = this.badgeClient.getEmojis(Array.from(message.emoteOffsets.keys()));

        const emoteList: Array<[string, number[]]> = [];

        for (const [key, ranges] of message.emoteOffsets) {
            const link = emotes[key];
            for (const range of ranges) {
                emoteList.push([link, range.split("-").map(Number)])
            }
        }

        emoteList.sort((e1, e2) => e1[1][0] - e2[1][0]);

        var lastRange = 0;
        const content = message.text;
        
        for (const [emoji, [start, end]] of emoteList) {
            let fragment = content.slice(lastRange, start);
            if (fragment.length) {
                parts.push(fragment);
            }
            lastRange = end + 1;
            parts.push({ emojiUrl: emoji });
        }

        let fragment = content.slice(lastRange).trim();
        if (fragment.length) {
            parts.push(fragment);
        }

        return parts;
    }

    private setupDisconnect() {
        this.chatModule.on("disconnect", () => {
            this.chatClient.quit();
        });
    }

    private async setupModule() {
        await this.badgeClient.loadBadges(this.channel);
        this.setupDisconnect();
        this.setupMessageHandler();
        this.chatClient.connect();
    }
}
