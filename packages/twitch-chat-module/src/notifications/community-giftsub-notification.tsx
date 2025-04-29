import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase, PlatformBadge } from "@syncsky/chat-ui";
import { CommunityGiftSubEvent } from "../twitch-events";

export function CommunityGiftSubNotification({ event }: NotificationProps<CommunityGiftSubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>Presenteou a comunidade com <b>{event.value.count}</b> subgift(s)</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    )
}
