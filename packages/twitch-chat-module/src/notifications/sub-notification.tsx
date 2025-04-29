import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase, PlatformBadge } from "@syncsky/chat-ui";
import { SubEvent } from "../twitch-events";
import { useState } from "react";

export function SubNotification({ event }: NotificationProps<SubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={
                <span>
                    se inscreveu por <b>{event.value.months}</b> meses
                    {event.value.isPrime && " usando prime"}
                </span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
