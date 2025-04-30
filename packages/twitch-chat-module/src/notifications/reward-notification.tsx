import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase } from "@syncsky/chat-ui";
import { RewardEvent } from "../twitch-events";
import { TwitchBadge } from "../badge/twitch";

export function RewardNotification({ event }: NotificationProps<RewardEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>resgatou <b>{event.value.title}</b></span>}
            icon={<TwitchBadge size={20}/>}
        />
    );
}
