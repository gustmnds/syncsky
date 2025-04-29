import { ChatBaseEvent, ChatMessageEvent, ChatSegmentType, isEvent, Utils } from "@syncsky/chat-api";
import { ChatExtension } from "@syncsky/chat-api/src/extension/chat-extension";
import { ChatExtensionManager } from "@syncsky/chat-api/src/extension/chat-extension-manager";
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

interface BTTVChatExtensionProps {
    channelId: string;
}

export class BTTVChatExtension {
    private readonly emotes: Record<string, Emote> = {};
    private readonly api = axios.create({ baseURL: "https://api.betterttv.net/3" });

    private constructor(
        private readonly extension: ChatExtension,
        private readonly opts: BTTVChatExtensionProps
    ) {
        this.initialize();
    };

    public static register(chatExtensionManager: ChatExtensionManager, opts: BTTVChatExtensionProps) {
        const extension = chatExtensionManager.createExtension();
        return new BTTVChatExtension(extension, opts);
    }

    private async loadEmotes(): Promise<void> {
        const [globalEmotes, userEmotes] = await Promise.all([
            await this.api.get<GlobalEmote[]>("/cached/emotes/global"),
            await this.api.get<UserEmotes>("/cached/users/twitch/" + this.opts.channelId).catch(() => undefined)
        ]);

        for (const { id, code, height, width } of globalEmotes.data) {
            this.emotes[code] = { id, height, width };
        }

        if (userEmotes) {
            for (const { id, code, width, height } of userEmotes.data.sharedEmotes) {
                this.emotes[code] = { id, width, height }
            }
        }
    }

    private onEventHandler(event: ChatBaseEvent) {
        if (!isEvent<ChatMessageEvent>("CHAT_MESSAGE", event)) return;
        
        event.value.segments = Utils.mapSegments(event.value.segments, segment => {
            if (typeof segment !== "string") return;

            if (segment in this.emotes) {
                const { id, height, width } = this.emotes[segment];
                return {
                    type: ChatSegmentType.emote,
                    url: `https://cdn.betterttv.net/emote/${id}/3x.webp`,
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
