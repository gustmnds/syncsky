import { ChatSegment, ChatSegmentType } from "@syncsky/chat-api";
import { MessageSegmentRaw } from "./message-segment-raw";
import { MessageSegmentEmote } from "./message-segment-emote";
import { MessageSegmentText } from "./message-segment-text";

export interface MessageSegmentProps<T extends ChatSegment> {
    segment: T
}

export function MessageSegment({ segment }: MessageSegmentProps<ChatSegment>) {
    if (typeof segment == "string") {
        return <MessageSegmentRaw segment={segment}/>
    }

    if (segment.type == ChatSegmentType.emote) {
        return <MessageSegmentEmote segment={segment}/>
    }

    if (segment.type == ChatSegmentType.text) {
        return <MessageSegmentText segment={segment}/>
    }
}
