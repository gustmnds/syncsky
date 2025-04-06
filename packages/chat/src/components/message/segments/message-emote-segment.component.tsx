import { ChatEmoteSegment, ChatTextSegment } from "@syncsky/chat-api"
import { MessageTextSegment } from "./message-text-segment.component";
import * as S from "../message.css";

type MessageEmoteSegmentProps = {
    segment: ChatEmoteSegment;
}

export function MessageEmoteSegment({ segment }: MessageEmoteSegmentProps) {    
    return (
        <div style={{ display: "inline-block" }}>
            <img
                src={segment.url}
                className={S.MessageSegment}
                style={{ display: "inline-block", verticalAlign: "middle" }}
                width={segment.options?.width || 28}
                height={segment.options?.height || 28}
            />
            {segment.text && <MessageTextSegment segment={segment.text as ChatTextSegment}/>}
        </div>
    )
}
