import { FollowEvent, NotificationProps } from "@syncsky/chat-api";
import { NotificationBase, PlatformBadge } from "@syncsky/chat-ui";

export function FollowNotification({ event }: NotificationProps<FollowEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>começou a seguir</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
