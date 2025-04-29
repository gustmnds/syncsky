import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase, PlatformBadge } from "@syncsky/chat-ui";
import { PaidMessageEvent } from "../youtube-events";

export function PaidMessageNotification({ event }: NotificationProps<PaidMessageEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>Enviou uma doação no valor de <b>{event.value.amount}</b></span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
