import { ApiClient } from "@twurple/api"
import { StaticAuthProvider } from "@twurple/auth"
import { ChatClient, ChatMessage } from "@twurple/chat"
import { EventSubWsListener } from "@twurple/eventsub-ws";
import {
    ChatMessageEvent,
    ChatMessageFilterEvent,
    ChatMessageModifier,
    ChatModule,
    Utils
} from "@syncsky/chat-api";

import { TwitchBadgeClient } from "./twitch-badge-client";
import { TwitchEmoteService } from "./twitch-emote-service";
import {
    BitsEvent,
    CommunityGiftSubEvent,
    GiftSubEvent,
    RaidEvent,
    ResubEvent,
    RewardEvent,
    SubEvent
} from "./twitch-events";

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
        private readonly badgeClient: TwitchBadgeClient,
        private readonly eventSub: EventSubWsListener,
        private readonly opts: TwitchChatSettings
    ) {
        this.setupModule();
    }

    public static register(chatModule: ChatModule, opts: TwitchChatSettings) {
        const authProvider = new StaticAuthProvider(opts.clientId, opts.accessToken);
        const chatClient = new ChatClient({ authProvider, channels: [opts.channel] });
        const apiClient = new ApiClient({ authProvider });
        const badgeClient = new TwitchBadgeClient(opts.channelId, apiClient);
        const emoteService = new TwitchEmoteService(apiClient);
        const eventSub = new EventSubWsListener({ apiClient });

        return new TwitchChatModule(
            chatModule,
            chatClient,
            emoteService,
            badgeClient,
            eventSub,
            opts
        );
    }

    private setupMessageHandler() {
        this.chatClient.onMessage((_channel, _user, _text, message) => {
            this.chatModule.pushEvent<ChatMessageEvent>({
                event: "CHAT_MESSAGE",
                value: {
                    platform: this.chatModule.platform,
                    messageId: message.id,
                    author: {
                        authorId: message.userInfo.userId,
                        authorColor: message.userInfo.color || Utils.getColorFromString(message.userInfo.userId),
                        authorName: message.userInfo.displayName,
                    },
                    badges: this.badgeClient.getBadges(message),
                    segments: this.emoteService.parseMessage(message),
                    modifiers: this.getMessageModifiers(message)
                }
            });

            if (message.bits > 0) {
                this.chatModule.pushEvent<BitsEvent>({
                    event: "BITS",
                    value: {
                        name: message.userInfo.displayName,
                        bits: message.bits
                    }
                });
            }
        });

        this.chatClient.onBan((_channel, _user, msg) => {
            if (!msg.targetUserId) return;
            this.chatModule.pushEvent<ChatMessageFilterEvent>({
                event: "CHAT_MESSAGE_FILTER",
                value: {
                    authorId: msg.targetUserId
                }
            });
        })

        this.chatClient.onMessageRemove((_channel, messageId) => {
            this.chatModule.pushEvent<ChatMessageFilterEvent>({
                event: "CHAT_MESSAGE_FILTER",
                value: {
                    messageId
                }
            })
        });

        this.chatClient.onChatClear(() => {
            this.chatModule.pushEvent<ChatMessageFilterEvent>({
                event: "CHAT_MESSAGE_FILTER",
                value: {}
            });
        });

        this.chatClient.onSub((_channel, user, subInfo) => {
            this.chatModule.pushEvent<SubEvent>({
                event: "SUB",
                value: {
                    name: user,
                    months: subInfo.months,
                    isPrime: subInfo.isPrime,
                }
            })
        });

        this.chatClient.onResub((_channel, user, subInfo) => {
            this.chatModule.pushEvent<ResubEvent>({
                event: "RESUB",
                value: {
                    name: user,
                    months: subInfo.months,
                    isPrime: subInfo.isPrime,
                }
            })
        });

        this.chatClient.onCommunitySub((_channel, user, subInfo) => {
            this.chatModule.pushEvent<CommunityGiftSubEvent>({
                event: "COMMUNITY_GIFTSUB",
                value: {
                    name: user,
                    count: subInfo.count
                }
            })
        });

        this.chatClient.onSubGift((_channel, recipient, subInfo) => {
            this.chatModule.pushEvent<GiftSubEvent>({
                event: "GIFTSUB",
                value: {
                    name: subInfo.gifter,
                    recipient: recipient
                }
            });
        });

        this.chatClient.onRaid((_channel, user, raidInfo) => {
            this.chatModule.pushEvent<RaidEvent>({
                event: "RAID",
                value: {
                    channel: user,
                    viewerCount: raidInfo.viewerCount
                }
            });
        });

        this.eventSub.onChannelFollow(this.opts.channelId, this.opts.channelId, (event) => {
            event.userName
            this.chatModule.pushEvent({
                event: "FOLLOW",
                value: {
                    name: event.broadcasterDisplayName
                }
            });
        });
        
        this.eventSub.onChannelRedemptionAdd(this.opts.channelId, async(event) => {
            this.chatModule.pushEvent<RewardEvent>({
                event: "REWARD",
                value: {
                    name: event.userDisplayName,
                    title: event.rewardTitle
                }
            });
        })
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
            this.eventSub.stop();
        });
        this.chatModule.on("stop", () => {
            this.chatClient.quit();
            this.eventSub.stop();
        });
        this.chatModule.on("resume", () => {
            this.chatClient.connect();
            this.eventSub.start();
        });
    }

    private async setupModule() {
        this.setupDisconnect();

        await this.badgeClient.loadBadges();
        await this.emoteService.load();
        this.eventSub.start();

        this.setupMessageHandler();
    }
}
