import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase } from "@syncsky/chat-ui";
import { ResubEvent } from "../twitch-events";
import { TwitchBadge } from "../badge/twitch";

export function ResubNotification({ event }: NotificationProps<ResubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={
                <span>
                    se reinscreveu por <b>{event.value.months}</b> meses
                    {event.value.isPrime && " usando prime"}
                </span>}
            icon={<TwitchBadge size={20}/>}
        />
    );
}
