import { ChatSegment } from "@syncsky/chat-api";

export function getColorFromString(input: string) {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & 0xFFFFFFFF;
    }

    const hue = Math.abs(hash) % 360;
    const saturation = 70 + (Math.abs(hash) % 30);
    const lightness = 50 + (Math.abs(hash) % 20);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


export function mapSegments(
    message: string | ChatSegment[],
    callback: (segment: ChatSegment) => ChatSegment | void
) {
    const finalMessage = Array<ChatSegment>();
    if (typeof message !== "string") {
        for (const segment of message) {
            if (typeof segment == "string") {
                finalMessage.push(...mapSegments(segment, callback));    
            } else {
                finalMessage.push(callback(segment) || segment);
            }
        }
        return finalMessage;
    }
    
    const textSegment = Array<string>();
    const segments = message.split(" ");

    for (const segment of segments) {
        const result = callback(segment);
        if (result) {
            if (textSegment.length) {
                finalMessage.push(textSegment.join(" "));
                textSegment.splice(0);
            }
            finalMessage.push(result);
        } else {
            textSegment.push(segment);
        }
    }

    if (textSegment.length) {
        finalMessage.push(textSegment.join(" "));
    }

    return finalMessage;
}
