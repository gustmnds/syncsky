import { ChatBaseEvent } from "../event-base";

export enum ChatSegmentType {
    text,
    emote
};

export interface ChatTextSegment {
    type: ChatSegmentType.text;
    content: string;
    style?: Record<string, string>
};

export interface ChatEmoteSegment {
    type: ChatSegmentType.emote;
    text?: Omit<ChatTextSegment, "type">;
    url: string;
    options?: {
        width?: number;
        height?: number;
    };
};

export type ChatSegment = string | ChatTextSegment | ChatEmoteSegment;

export enum ChatMessageModifier {
    GIGANTIC_EMOTE
}

export interface ChatAuthor {
    authorId: string;
    authorName: string;
    authorColor: string;
}

export interface ChatMessage {
    platform: string;
    messageId: string;
    author: ChatAuthor;
    badges: Array<string>;
    segments: Array<ChatSegment>;
    modifiers: ChatMessageModifier[];
};

export interface ChatMessageEvent extends ChatBaseEvent<"CHAT_MESSAGE", ChatMessage> {};
