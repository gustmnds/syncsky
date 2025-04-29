import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase, PlatformBadge } from "@syncsky/chat-ui";
import { GiftSubEvent } from "../twitch-events";

export function GiftSubNotification({ event }: NotificationProps<GiftSubEvent>) {
    return (
        <NotificationBase
            title={(event.value.name ? (<b>{event.value.name}</b>) : <span>Anonimo</span>)}
            text={<span>presenteou <b>{event.value.recipient}</b> com um subgift</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
