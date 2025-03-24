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
                    <img className={S.MessageBadgeIcon} width={18} height={18} src={message.platform + ".png"}/>
                    {message.badges.map((badge, idx) => (
                        <img className={S.MessageBadgeIcon} key={idx} width={18} height={18} src={badge}/>
                    ))}
                </div>
                <span className={S.MessageAuthor} style={{ color: message.authorColor }}>{message.authorName}</span>
            </div>
            <span>
                <span>: </span>
                <span>
                    <span style={{ wordBreak: "break-word" }}>
                        {message.content.map(data => {
                            if (typeof data === "string") {
                                return <span>{data}</span>
                            }
                            return <img style={{ display: "inline-block", verticalAlign: "middle" }} width={28} height={28} src={data.emojiUrl}/>
                        })}
                    </span>
                </span>
            </span>
        </div>
    );
}
