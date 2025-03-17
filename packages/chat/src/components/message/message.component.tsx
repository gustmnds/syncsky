import { ChatMessage } from "@syncsky/chat-api";
import * as S from "./message.css";

interface MessageProps {
    message: ChatMessage
}

export function Message({ message }: MessageProps) {
    return (
        <div className={S.MessageContainer}>
            <div className={S.MessageAuthorContainer}>
                <div className={S.MessageBadges}>
                    {message.badges.map((badge, idx) => (
                        <img className={S.MessageBadgeIcon} key={idx} width={18} height={18} src={badge}/>
                    ))}
                </div>
                <span className={S.MessageAuthor} style={{ color: message.authorColor }}>{message.authorName}</span>
            </div>
            <span>
                <span>: </span>
                <span>
                    <span>{message.content.join(" ")}</span>
                </span>
            </span>
        </div>
    );
}
