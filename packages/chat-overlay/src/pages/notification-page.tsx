import "@syncsky/chat-ui/styles.css"
import { useAgentContext } from "@/context/agent";
import { ChatBaseEvent } from "@syncsky/chat-api";
import { useCallback, useEffect, useState } from "react";
import { usePluginContext } from "@/context/plugin";

export function NotificationPage() {
    const { socket } = useAgentContext();
    const [events, setEvents] = useState(Array<ChatBaseEvent>());
    const { createNotification, notificationEvents } = usePluginContext();

    const pushNotification = useCallback((event: ChatBaseEvent) => {
        setEvents((items) => [event, ...items]);
    }, []);

    useEffect(() => {
        notificationEvents.forEach((event) => socket.on(event, pushNotification));
        return () => notificationEvents.forEach((event) => socket.off(event, pushNotification));
    }, [socket, pushNotification, notificationEvents]);

    return (
        <div style={{
            flex: 1,
            gap: "8px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
        }}>
            {events.map((event) => createNotification(event)).flat()}
        </div>
    );
}
