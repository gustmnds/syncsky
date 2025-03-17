import { ChatModule, ChatModuleManager } from "@syncsky/chat-api";
import { StaticAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { ApiClient } from "@twurple/api"
import { TwitchBadgeClient } from "./src/twitch-badge-client";

interface TwitchChatSettings {
    clientId: string;
    accessToken: string;
    channel: string;
}

export class TwichChatModule {

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

        return new TwichChatModule(chatModule, chatClient, badgeClient, opts.channel);
    }

    private setupMessageHandler() {
        this.chatClient.onMessage((channel, user, text, message) => {
            this.chatModule.addMessage({
                authorColor: message.userInfo.color || "#FF0000",
                authorId: message.userInfo.userId,
                authorName: message.userInfo.displayName,
                badges: this.badgeClient.getBadges(message.userInfo.badges),
                content: [text],
                messageId: message.id
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

    private async setupModule() {
        await this.badgeClient.loadBadges(this.channel);
        this.setupMessageHandler();
        this.chatClient.connect();
    }
}
