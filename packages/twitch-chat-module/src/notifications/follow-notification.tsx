import { FollowEvent, NotificationProps } from "@syncsky/chat-api";
import { NotificationBase } from "@syncsky/chat-ui";
import { TwitchBadge } from "../badge/twitch";

export function FollowNotification({ event }: NotificationProps<FollowEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>começou a seguir</span>}
            icon={<TwitchBadge size={20}/>}
        />
    );
}
