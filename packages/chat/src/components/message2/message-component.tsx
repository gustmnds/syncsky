import { ChatMessage } from "@syncsky/chat-api";
import { MessageSegment } from "./message-segment.component";

interface MessageProps {
    message: ChatMessage
}

export function Message({ message }: MessageProps) {
    return (
        <div className="message" style={{ display: "inline", lineHeight: 1.5 }}>
            <div className="author" style={{ display: "inline", verticalAlign: "middle" }}>
                <div className="badges" style={{ display: "inline" }}>
                    {message.badges.map((badge, idx) => (
                        <img
                            key={idx}
                            src={badge}
                            width={18}
                            height={18}
                            style={{ 
                                display: "inline",
                                verticalAlign: "middle",
                                marginRight: "3px"
                            }}
                        />
                    ))}
                </div>
                <span style={{ color: message.author.authorColor, fontWeight: 700 }}>{message.author.authorName}</span>
            </div>
            <span style={{verticalAlign: "middle"}}>: </span>
            <span className="content" style={{verticalAlign: "middle"}}>
                {message.segments.map((segment, idx) => (
                    <MessageSegment key={idx} segment={segment}/>
                ))}
            </span>
        </div>
    )  
}


/*

[badges][nome]: [message | icons]

*/
