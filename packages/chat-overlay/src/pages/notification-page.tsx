import "@syncsky/chat-ui/styles.css"
import { useAgentContext } from "@/context/agent";
import { ChatBaseEvent } from "@syncsky/chat-api";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePluginContext } from "@/context/plugin";

export function NotificationPage() {
    const { socket } = useAgentContext();
    const { createNotification, notificationEvents } = usePluginContext();

    const notificationsRef = useRef<string[]>([]);
    const [events, setEvents] = useState(Array<ChatBaseEvent>());

    const pushNotification = useCallback((eventName: string, event: ChatBaseEvent) => {
        if (notificationsRef.current.includes(eventName)) {
            setEvents((items) => [event, ...items]);
        }
    }, []);

    useEffect(() => {
        socket.onAny(pushNotification);
        return () => void socket.offAny(pushNotification);
    }, [socket, pushNotification]);

    useEffect(() => {
        notificationsRef.current = notificationEvents;
    }, [notificationEvents])

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
