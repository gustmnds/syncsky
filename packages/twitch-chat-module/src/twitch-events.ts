import { ChatBaseEvent } from "@syncsky/chat-api";

export interface ResubEvent extends ChatBaseEvent<"RESUB", {
    name: string;
    months: number;
    isPrime: boolean;
}> {}

export interface SubEvent extends ChatBaseEvent<"SUB", {
    name: string;
    months: number;
    isPrime: boolean;
}> {}

export interface CommunityGiftSubEvent extends ChatBaseEvent<"COMMUNITY_GIFTSUB", {
    name: string;
    count: number;
}> {}

export interface GiftSubEvent extends ChatBaseEvent<"GIFTSUB", {
    name?: string;
    recipient: string;
}> {}

export interface RaidEvent extends ChatBaseEvent<"RAID", {
    channel: string;
    viewerCount: number;
}> {}

export interface BitsEvent extends ChatBaseEvent<"BITS", {
    name: string;
    bits: number;
}> {}
