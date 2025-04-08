import { Innertube, UniversalCache, YTNodes, YT, Misc } from 'youtubei.js';
import { ChatModule, ChatModuleManager, ChatSegment, ChatSegmentType, Utils } from "@syncsky/chat-api";

export interface YoutubeChatSettings {
    channelId: string;
    liveId?: string;
}

export class YoutubeChatModule {
    private chat?: YT.LiveChat;

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
                    //TODO: refatorar para outros links
                    total.push("/youtube/" + badge.icon_type.toLowerCase() + ".png");
                }
            }
            
            return total;
        }, Array<string>());
    }

    private removeChatMessage(removeChatItemAction: YTNodes.RemoveChatItemAction) {
        this.chatModule.removeMessageById(removeChatItemAction.target_item_id);
    }

    private removeAuthorMessages(removeChatItemByAuthorAction: YTNodes.RemoveChatItemByAuthorAction) {
        this.chatModule.removeMessagesByAuthorId(removeChatItemByAuthorAction.external_channel_id);
    }

    private addChatMessage(addChatItemAction: YTNodes.AddChatItemAction) {
        const message = addChatItemAction.item;
        if (!message.is(YTNodes.LiveChatTextMessage)) return;
        if (!message.message.runs) return;

        this.chatModule.addMessage({
            messageId: message.id,
            author: {
                authorColor: Utils.getColorFromString(message.author.id),
                authorId: message.author.id,
                authorName: message.author.name
            },
            modifiers: [],
            badges: this.parseBadges(message.author.badges),
            segments: this.parseSegments(message.message.runs)
        })
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
        })
    }

    private async setupChat(force = false) {
        let videoId = this.opts.liveId;
        if (!videoId) {
            if (force && this.chat) {
                this.chat.stop();
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
    }

    private async setupModule() {
        this.setupChat();

        this.chatModule.on("stop", () => {
            console.log("stop");
            this.chat?.stop()
        })

        this.chatModule.on("resume", () => {
            console.log("resume");
            this.chat?.start();
        })
    }
}
