import { ChatTextSegment } from "@syncsky/chat-api"
import * as S from "../message.css";

type MessageTextSegmentProps = {
    segment: ChatTextSegment;
}

export function MessageTextSegment({ segment }: MessageTextSegmentProps) {
    return (
        <span
            style={segment.style}
            className={S.MessageSegment}
        >
            {segment.content}
        </span>
    )
}
