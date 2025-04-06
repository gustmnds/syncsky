import { ChatMessage } from "@syncsky/chat-api";
import { MessageSegment } from "./message-segment.component";
import { MessageGiganticEmoteSegment } from "./segments/message-gigantic-segment.component";
import { useMessage } from "./hooks/use-message";
import * as S from "./message.css";

interface MessageProps {
    message: ChatMessage
}

export function Message({ message }: MessageProps) {
    const { segments, badges, author, extra } = useMessage(message);

    return (
        <div className={S.MessageContainer}>
            <div className={S.MessageAuthorContainer}>
                <div className={S.MessageBadges}>
                    {extra.logo && <extra.logo className={S.MessageBadgeIcon} size={18}/>}
                    {badges.map((badge, idx) => (
                        <img className={S.MessageBadgeIcon} key={idx} width={18} height={18} src={badge}/>
                    ))}
                </div>
                <span className={S.MessageAuthor} style={{ color: author.authorColor }}>{author.authorName}</span>
            </div>
            <span>
                <span>: </span>
                <span style={{ wordBreak: "break-all" }}>
                    {segments.map((segment, index) => (
                        <MessageSegment key={index} segment={segment}/>
                    ))}
                </span>
                {extra.gigantic && <MessageGiganticEmoteSegment segment={extra.gigantic}/>}
            </span>
        </div>
    );
}
