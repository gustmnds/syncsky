import { ChatSegment, ChatSegmentType, Utils } from "@syncsky/chat-api";
import { ApiClient, HelixCheermoteList } from "@twurple/api";
import { ChatMessage } from "@twurple/chat";

type EmoteRage = {
    emoteUrl: string;
    start: number,
    end: number
}

const BITS_RGX = /(.+?)(\d+)$/;

export class TwitchEmoteService {
    constructor(private readonly apiClient: ApiClient) {}

    private bitsEmotes?: HelixCheermoteList;

    public parseMessage(message: ChatMessage): Array<ChatSegment> {
        let messageSegments = this.parseMessageEmotes(message.text, message.emoteOffsets);

        if (message.bits > 0) {
            messageSegments = this.parseCheermote(messageSegments);
        }

        return messageSegments
    }

    private parseMessageEmotes(messageContent: string, emotes: Map<string, string[]>): Array<ChatSegment> {
        const parts: Array<ChatSegment> = [];
        const emotesRanges = this.parseEmotesRanges(emotes);

        var lastIndex = 0;
        
        for (const { emoteUrl, start, end } of emotesRanges) {
            let fragment = messageContent.slice(lastIndex, start).trim();
            if (fragment.length) parts.push(fragment);
            
            parts.push({
                type: ChatSegmentType.emote,
                url: emoteUrl
            });

            lastIndex = end + 1;
        }

        let fragment = messageContent.slice(lastIndex).trim();
        if (fragment.length) parts.push(fragment);

        return parts;
    }
    
    private getEmotes(emotesIds: string[]): Record<string, string> {
        return Object.fromEntries(
            emotesIds.map(id => [id, `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`])
        );
    }

    private parseEmotesRanges(emotes: Map<string, string[]>): Array<EmoteRage> {
        const emotesIds = Array.from(emotes.keys());
        const emotesData = this.getEmotes(emotesIds);

        const emoteList: Array<EmoteRage> = [];

        for (const [id, ranges] of emotes) {
            const emoteUrl = emotesData[id];
            for (const range of ranges) {
                const [start, end] = range.split("-").map(Number);
                emoteList.push({
                    emoteUrl,
                    start,
                    end
                });
            }
        }

        return emoteList.sort((emote1, emote2) => emote1.start - emote2.start);
    }

    private parseCheermote(message: Array<ChatSegment>): Array<ChatSegment> {
        if (!this.bitsEmotes) return message;

        const cheerNames = this.bitsEmotes.getPossibleNames()

        return Utils.mapSegments(message, segment => {
            if (typeof segment !== "string") return;
            
            const bitsMatch = BITS_RGX.exec(segment.toLowerCase());
            if (!bitsMatch) return;

            const [, name, amount] = bitsMatch;
            if (!cheerNames.includes(name)) return;

            const emote = this.bitsEmotes!.getCheermoteDisplayInfo(name, Number(amount), {
                background: "dark",
                scale: "1",
                state: "animated"
            });

            return {
                type: ChatSegmentType.emote,
                url: emote.url,
                text: {
                    content: amount,
                    style: {
                        color: emote.color,
                        fontWeight: "bold"
                    }
                }
            }
        });
    }

    public async load() {
        this.bitsEmotes = await this.apiClient.bits.getCheermotes();
    }
}
