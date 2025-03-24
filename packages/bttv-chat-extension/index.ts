import { ChatMessage } from "@syncsky/chat-api";
import { ChatExtension } from "@syncsky/chat-api/src/extension/chat-extension";
import { BTTVSocket } from "./src/bttv-socker";
import axios from "axios"

interface Emote {
    id: string
    code: string
    imageType: string
    animated: boolean
    userId: string
    modifier: boolean
    width?: number
    height?: number
}
  

export class BTTVChatExtension extends ChatExtension {
    private readonly api = axios.create({ baseURL: "https://api.betterttv.net/3" });
    private emotes: Record<string,string> = {};

    async initialize(): Promise<void> {
        const response = await this.api.get<Emote[]>("/cached/emotes/global");

        for (const emote of response.data) {
            this.emotes[emote.code] = emote.id;
        }
    }

    async onMessage(message: ChatMessage): Promise<void> {
        const content = [];

        for (var i = 0; i < message.content.length; i++) {
            const current = message.content[i];
            if (typeof current !== "string") {
                content.push(current);
                continue;
            }

            const segments = current.split(" ");
            let text = [];
            for (const segment of segments) {
                if (segment in this.emotes) {
                    if (text.length) {
                        content.push(text.join(" "));
                        text = [];
                    }
                    content.push({ emojiUrl: `https://cdn.betterttv.net/emote/${this.emotes[segment]}/2x.webp` });
                } else {
                    text.push(segment);
                }
            }

            if (text.length) {
                content.push(text.join(" "));
            }
        }

        console.log(content);

        message.content = content;
    }
}
