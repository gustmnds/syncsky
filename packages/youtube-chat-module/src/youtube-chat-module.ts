import { Innertube, UniversalCache, YTNodes, YT, Misc, Log } from 'youtubei.js';
import { ChatMessageEvent, ChatMessageFilterEvent, ChatModule, ChatModuleManager, ChatSegment, ChatSegmentType, Utils } from "@syncsky/chat-api";
import { getAsset } from './youtube-assets-service';
import { PaidMessageEvent } from './youtube-events';

Log.setLevel();

export interface YoutubeChatSettings {
    channelId: string;
    liveId?: string;
}

export class YoutubeChatModule {
    private chat?: YT.LiveChat;
    private isRunning: boolean = false;

    private constructor(
        private readonly youtube: Innertube,
        private readonly chatModule: ChatModule,
        private readonly opts: YoutubeChatSettings
    ) {
        this.setupModule();
    }

    public static async register(chatModuleManager: ChatModuleManager, opts: YoutubeChatSettings) {
        const youtube = await Innertube.create({ cache: new UniversalCache(false) });
        const chatModule = chatModuleManager.createModule({ platform: "youtube" });
        return new YoutubeChatModule(youtube, chatModule, opts);
    }

    public static async register2(chatModule: ChatModule, opts: YoutubeChatSettings) {
        const youtube = await Innertube.create({ cache: new UniversalCache(false) });
        return new YoutubeChatModule(youtube, chatModule, opts);
    }

    private parseSegments(segments: Array<Misc.EmojiRun | Misc.TextRun>): ChatSegment[] {
        return segments.map((segment) => {
            if ("emoji" in segment) {
                return {
                    type: ChatSegmentType.emote,
                    url: segment.emoji.image[0].url
                }
            }

            return segment.text;
        })
    }

    private parseBadges(badges: Misc.Author["badges"]): string[] {
        return badges.reduce((total, badge) => {
            
            if (badge.is(YTNodes.LiveChatAuthorBadge)) {
                if (badge.custom_thumbnail.length) {
                    total.push(badge.custom_thumbnail[0].url);
                } else if (badge.icon_type) {
                    total.push(getAsset(badge.icon_type));
                }
            }
            
            return total;
        }, Array<string>());
    }

    private removeChatMessage(removeChatItemAction: YTNodes.RemoveChatItemAction) {
        this.chatModule.pushEvent<ChatMessageFilterEvent>({
            event: "CHAT_MESSAGE_FILTER",
            value: {
                messageId: removeChatItemAction.target_item_id
            }
        });
    }

    private removeAuthorMessages(removeChatItemByAuthorAction: YTNodes.RemoveChatItemByAuthorAction) {
        this.chatModule.pushEvent<ChatMessageFilterEvent>({
            event: "CHAT_MESSAGE_FILTER",
            value: {
                authorId: removeChatItemByAuthorAction.external_channel_id
            }
        });
    }

    private addChatMessage(addChatItemAction: YTNodes.AddChatItemAction) {
        const message = addChatItemAction.item;
        if (message.is(YTNodes.LiveChatTextMessage) || message.is(YTNodes.LiveChatPaidMessage)) {
            if (!message.message.runs) return;
    
            this.chatModule.pushEvent<ChatMessageEvent>({
                event: "CHAT_MESSAGE",
                value: {
                    messageId: message.id,
                    platform: this.chatModule.platform,
                    author: {
                        authorColor: Utils.getColorFromString(message.author.id),
                        authorId: message.author.id,
                        authorName: message.author.name
                    },
                    modifiers: [],
                    badges: this.parseBadges(message.author.badges),
                    segments: this.parseSegments(message.message.runs)
                }
            });
        };

        if (message.is(YTNodes.LiveChatPaidMessage) || message.is(YTNodes.LiveChatPaidSticker)) {
            this.chatModule.pushEvent<PaidMessageEvent>({
                event: "PAID_MESSAGE",
                value: {
                    name: message.author.name,
                    amount: message.purchase_amount
                }
            });
        }
    }

    private setupChatHandler(chat: YT.LiveChat) {
        chat.on("chat-update", action => {
            if (action.is(YTNodes.AddChatItemAction)) {
                this.addChatMessage(action);
            } else if (action.is(YTNodes.RemoveChatItemAction)) {
                this.removeChatMessage(action);
            } else if (action.is(YTNodes.RemoveChatItemByAuthorAction)) {
                this.removeAuthorMessages(action);
            }
        });

        chat.on("end", () => this.setupChat(true));
    }

    private async setupChat(force = false) {
        try {
            let videoId = this.opts.liveId;
            if (!videoId) {
                if (force && this.chat) {
                    this.chat.stop();
                    this.chat = undefined;
                }
            
                const channel = await this.youtube.getChannel(this.opts.channelId);
                const streams = await channel.getLiveStreams();
                const currentStream = streams.videos.find((live) => live.as(YTNodes.Video).is_live);
            
                if (!currentStream) {
                    setTimeout(() => this.setupChat(force), 5000);
                    return;
                };
            
                videoId = currentStream.as(YTNodes.Video).video_id;
            }

            const streamInfo = await this.youtube.getInfo(videoId);
            this.chat = streamInfo.getLiveChat();
            this.setupChatHandler(this.chat);

            if (this.isRunning) {
                this.chat.start();
            }
        } catch (err) {
            this.setupChat(force);
        }
    }

    private async setupModule() {        
        this.chatModule.on("stop", () => {
            this.chat?.stop()
            this.isRunning = false;
        })
        
        this.chatModule.on("resume", () => {
            this.chat?.start();
            this.isRunning = true;
        })

        this.setupChat();
    }
}
