import { ChatBaseEvent, ChatMessageEvent, ChatSegmentType, isEvent, Utils } from "@syncsky/chat-api";
import { ChatExtension } from "@syncsky/chat-api/src/extension/chat-extension";
import { ChatExtensionManager } from "@syncsky/chat-api/src/extension/chat-extension-manager";
import axios from "axios"

interface Emote {
    url: string
    width: number
    height: number
}

interface SevenTVUserEmoteResponse {
    emote_set: {
        emotes: Array<{
            data: {
                id: string
                name: string
                host: {
                    url: string
                    files: Array<{
                        name: string
                        static_name: string
                        width: number
                        height: number
                        frame_count: number
                        size: number
                        format: string
                    }>
                }
            }
        }>
    }
}

interface SevenTVChatExtensionProps {
    channelId: string;
}

export class SevenTVChatExtension {
    private readonly emotes: Record<string, Emote> = {};
    private readonly SCALE = 28/64;

    private readonly api = axios.create({ 
        baseURL: "https://7tv.io/v3",
        validateStatus: () => true
    });

    private constructor(
        private readonly extension: ChatExtension,
        private readonly opts: SevenTVChatExtensionProps
    ) {
        this.initialize();
    };

    public static register(chatExtensionManager: ChatExtensionManager, opts: SevenTVChatExtensionProps) {
        const extension = chatExtensionManager.createExtension();
        return new SevenTVChatExtension(extension, opts);
    }

    private async loadEmotes(): Promise<void> {
        const { data, status } = await this.api.get<SevenTVUserEmoteResponse>("/users/twitch/" + this.opts.channelId);
        
        if (status !== 200 || !data.emote_set) return;
        
        for (const emote of data.emote_set.emotes) {
            const emoteData = this.getEmote(emote.data.host.files);
            this.emotes[emote.data.name] = {
                url: "https:" + emote.data.host.url + "/2x.webp",
                width: emoteData.width * this.SCALE,
                height: emoteData.height * this.SCALE
            }
        }
    }

    private getEmote(emotes: SevenTVUserEmoteResponse["emote_set"]["emotes"][number]["data"]["host"]["files"]) {
        for (const emote of emotes) {
            if (emote.name == "2x.webp") {
                return emote;
            }
        }

        return emotes[0];
    }

    private onEventHandler(event: ChatBaseEvent) {
        if (!isEvent<ChatMessageEvent>("CHAT_MESSAGE", event)) return;

        event.value.segments = Utils.mapSegments(event.value.segments, segment => {
            if (typeof segment !== "string") return;

            if (segment in this.emotes) {
                const { url, height, width } = this.emotes[segment];
                return {
                    type: ChatSegmentType.emote,
                    url,
                    options: { width, height }
                };
            }
        });
    }

    private async initialize() {
        await this.loadEmotes();
        this.extension.onEvent(this.onEventHandler.bind(this));
    }
}
