import { ChatMessageModifier, ChatModule, ChatModuleManager, Utils } from "@syncsky/chat-api";
import { StaticAuthProvider } from "@twurple/auth"
import { ChatClient, ChatMessage, parseChatMessage } from "@twurple/chat"
import { ApiClient } from "@twurple/api"
import { TwitchBadgeClient } from "./twitch-badge-client";
import { TwitchEmoteService } from "./twitch-emote-service";

export interface TwitchChatSettings {
    clientId: string;
    accessToken: string;
    channel: string;
    channelId: string;
}

export class TwitchChatModule {

    private constructor(
        private readonly chatModule: ChatModule,
        private readonly chatClient: ChatClient,
        private readonly emoteService: TwitchEmoteService,
        private readonly badgeClient: TwitchBadgeClient
    ) {
        this.setupModule();
    }

    public static register(chatModuleManager: ChatModuleManager, opts: TwitchChatSettings) {
        const authProvider = new StaticAuthProvider(opts.clientId, opts.accessToken);
        const chatClient = new ChatClient({ authProvider, channels: [opts.channel] });
        const apiClient = new ApiClient({ authProvider });
        const badgeClient = new TwitchBadgeClient(opts.channelId, apiClient);
        const emoteService = new TwitchEmoteService(apiClient);
        const chatModule = chatModuleManager.createModule({ platform: "twitch" });

        return new TwitchChatModule(
            chatModule,
            chatClient,
            emoteService,
            badgeClient
        );
    }

    private setupMessageHandler() {
        this.chatClient.onMessage((channel, user, text, message) => {
            this.chatModule.addMessage({
                messageId: message.id,
                author: {
                    authorId: message.userInfo.userId,
                    authorColor: message.userInfo.color || Utils.getColorFromString(message.userInfo.userId),
                    authorName: message.userInfo.displayName,
                },
                badges: this.badgeClient.getBadges(message),
                segments: this.emoteService.parseMessage(message),
                modifiers: this.getMessageModifiers(message)
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

    private getMessageModifiers(message: ChatMessage): ChatMessageModifier[] {
        const modifiers = Array<ChatMessageModifier>();
        if (message.tags.get("msg-id") == "gigantified-emote-message") {
            modifiers.push(ChatMessageModifier.GIGANTIC_EMOTE);
        }

        return modifiers;
    }

    private setupDisconnect() {
        this.chatModule.on("disconnect", () => {
            this.chatClient.quit();
        });
        this.chatModule.on("stop", () => {
            this.chatClient.quit();
        });
        this.chatModule.on("resume", () => {
            this.chatClient.connect();
        });
    }

    private async setupModule() {
        await this.badgeClient.loadBadges();
        await this.emoteService.load();

        this.setupDisconnect();
        this.setupMessageHandler();
    }
}
