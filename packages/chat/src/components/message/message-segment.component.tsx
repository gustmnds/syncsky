import * as S from "./message.css";

import { ChatSegment, ChatSegmentType } from "@syncsky/chat-api"
import { MessageTextSegment } from "./segments/message-text-segment.component";
import { MessageEmoteSegment } from "./segments/message-emote-segment.component";

export type MessageSegmentProps = {
    segment: ChatSegment;
}

export function MessageSegment({ segment }: MessageSegmentProps) {
    if (typeof segment == "string") {
        return <span className={S.MessageSegment}>{segment}</span>
    }

    if (segment.type == ChatSegmentType.text) {
        return <MessageTextSegment segment={segment}/>
    }

    if (segment.type == ChatSegmentType.emote) {
        return <MessageEmoteSegment segment={segment}/>
    }

    return <span/>
}
