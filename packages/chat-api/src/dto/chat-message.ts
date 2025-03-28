export interface ChatEmoji {
    emojiUrl: string
}

export interface ChatMessage {
    platform: string;
    messageId: string;
    authorId: string;
    authorName: string;
    authorColor: string;
    badges: Array<string>;
    content: Array<string | ChatEmoji>
}
