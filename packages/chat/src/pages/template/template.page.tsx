import { Message } from "@/components/message2/message-component";
import { ChatMessage, ChatSegment, ChatSegmentType } from "@syncsky/chat-api";


function createSegments(messageId: string, segments: ChatSegment[]): ChatMessage {
    return {
        platform: "twitch",
        messageId,
        author: {
            authorColor: "#FF0000",
            authorId: "0",
            authorName: "Lorem Ipsum"
        },
        segments,
        badges: [
            "https://static-cdn.jtvnw.net/badges/v1/e33e0c67-c380-4241-828a-099c46e51c66/2",
            "https://static-cdn.jtvnw.net/badges/v1/e33e0c67-c380-4241-828a-099c46e51c66/2"
        ],
        modifiers: [],
    }
}

const messages: ChatMessage[] = [
    createSegments("0", [
        {
            type: ChatSegmentType.text,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, veniam illum! Recusandae, optio sunt tenetur, a ipsa nobis consectetur nulla, qui nemo praesentium eos consequatur magni est laudantium vero et?"
        }
    ]),
    createSegments("1", [
        {
            type: ChatSegmentType.text,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/3x.webp"
        },
        {
            type: ChatSegmentType.text,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/3x.webp"
        },
        {
            type: ChatSegmentType.text,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/573d38b50ffbf6cc5cc38dc9/3x.webp",
            options: {
                width: 37
            }
        },
        {
            type: ChatSegmentType.text,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/2.gif",
            text: {
                content: "100",
                style: {
                    fontWeight: "bold",
                    color: "gray"
                }
            }
        },
        {
            type: ChatSegmentType.emote,
            url: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/2.gif",
            text: {
                content: "100",
                style: {
                    fontWeight: "bold",
                    color: "gray"
                }
            }
        },
        {
            type: ChatSegmentType.emote,
            url: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/2.gif",
            text: {
                content: "100",
                style: {
                    fontWeight: "bold",
                    color: "gray"
                }
            }
        },
        {
            type: ChatSegmentType.emote,
            url: "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/2.gif",
            text: {
                content: "100",
                style: {
                    fontWeight: "bold",
                    color: "gray"
                }
            }
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/3x.webp"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/3x.webp"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/3x.webp"
        },
        {
            type: ChatSegmentType.emote,
            url: "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/3x.webp"
        },
        {
            type: ChatSegmentType.text,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        }
    ])
]

export function Template() {
       return (
            <div style={{
                height: "500px",
                width: "400px",
                border: "1px solid white",
                padding: "1rem",
                display: "flex",
                flexDirection: "column-reverse",
                gap: "0.5rem",
                backgroundColor: "#12121A",
                overflow: "hidden"
            }}>
                {messages.map(message => (
                    <Message key={message.messageId} message={message}/>
                ))}
            </div>
       )
}
