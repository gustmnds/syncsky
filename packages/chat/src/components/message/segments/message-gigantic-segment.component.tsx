import { ChatEmoteSegment } from "@syncsky/chat-api"
import * as S from "../message.css";

type MessageGiganticEmoteSegmentProps = {
    segment: ChatEmoteSegment;
}

export function MessageGiganticEmoteSegment({ segment }: MessageGiganticEmoteSegmentProps) {    
    return (
        <div style={{ display: "block" }}>
            <img
                src={segment.url}
                className={S.MessageSegment}
                width={112}
                height={112}
            />
        </div>
    )
}
