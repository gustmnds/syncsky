import { ChatBaseEvent } from "../event-base";

export interface FollowEvent extends ChatBaseEvent<"FOLLOW", {
    name: string;
}> {};
