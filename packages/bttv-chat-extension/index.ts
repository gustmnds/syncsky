import { ChatMessage, ChatSegment, ChatSegmentType, Utils } from "@syncsky/chat-api";
import { ChatExtension } from "@syncsky/chat-api/src/extension/chat-extension";
import axios from "axios"

interface Emote {
    id: string
    width?: number
    height?: number
}


interface GlobalEmote {
    id: string
    code: string
    width?: number
    height?: number
}

interface UserEmotes {
    sharedEmotes: {
        id: string
        code: string
        width?: number
        height?: number
    }[]
}

export class BTTVChatExtension extends ChatExtension {
    private readonly emotes: Record<string, Emote> = {};
    private readonly api = axios.create({ baseURL: "https://api.betterttv.net/3" });

    constructor(private readonly channelId: string) {
        super();
    }

    async initialize(): Promise<void> {
        const [globalEmotes, userEmotes] = await Promise.all([
            await this.api.get<GlobalEmote[]>("/cached/emotes/global"),
            await this.api.get<UserEmotes>("/cached/users/twitch/" + this.channelId)
        ]);

        for (const { id, code, height, width } of globalEmotes.data) {
            this.emotes[code] = { id, height, width };
        }

        for (const { id, code, width, height } of userEmotes.data.sharedEmotes) {
            this.emotes[code] = { id, width, height }
        }
    }

    async onMessage(message: ChatMessage): Promise<void> {
        message.segments = Utils.mapSegments(message.segments, segment => {
            if (typeof segment !== "string") return;

            if (segment in this.emotes) {
                const emote = this.emotes[segment];
                return {
                    type: ChatSegmentType.emote,
                    url: `https://cdn.betterttv.net/emote/${emote.id}/2x.webp`,
                    options: {
                        width: emote.width,
                        height: emote.height
                    }
                }
            }
        });
    }
}
