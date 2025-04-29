import { GiftSubEvent } from "@syncsky/twitch-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function GiftSubNotification({ event }: NotificationEventProps<GiftSubEvent>) {
    return (
        <NotificationBase
            title={(event.value.name ? (<b>{event.value.name}</b>) : <span>Anonimo</span>)}
            text={<span>presenteou <b>{event.value.recipient}</b> com um subgift</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
