import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase } from "@syncsky/chat-ui";
import { CommunityGiftSubEvent } from "../twitch-events";
import { TwitchBadge } from "../badge/twitch";

export function CommunityGiftSubNotification({ event }: NotificationProps<CommunityGiftSubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>Presenteou a comunidade com <b>{event.value.count}</b> subgift(s)</span>}
            icon={<TwitchBadge size={20}/>}
        />
    )
}
