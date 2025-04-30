import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase } from "@syncsky/chat-ui";
import { SubEvent } from "../twitch-events";
import { TwitchBadge } from "../badge/twitch";

export function SubNotification({ event }: NotificationProps<SubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={
                <span>
                    se inscreveu por <b>{event.value.months}</b> meses
                    {event.value.isPrime && " usando prime"}
                </span>}
            icon={<TwitchBadge size={20}/>}
        />
    );
}
