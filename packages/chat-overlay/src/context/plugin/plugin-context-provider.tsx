import axios from "axios"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ChatBaseEvent, NotificationSettings, PluginManager } from "@syncsky/chat-api";
import { useUIManager } from "./hooks/use-ui-manager";
import { PluginContext } from "./plugin-context"

export interface PluginContextProviderProps {
    children: React.ReactNode;
}

export function PluginContextProvider({ children }: PluginContextProviderProps) {
    const [notificationEvents, setNotificationEvents] = useState(Array<string>());
    
    const [notifications, setNotifications] = useState(Array<{
        props: NotificationSettings<ChatBaseEvent>,
        Element: React.FC<{ event: ChatBaseEvent }>
    }>(0));

    const registerNotification = useCallback((
        element: React.FC<{ event: ChatBaseEvent }>,
        props: NotificationSettings<ChatBaseEvent>
    ) => {
        setNotifications((notifications) => [...notifications, { Element: element, props }]);
        setNotificationEvents((events) => Array.from(new Set([...events, props.event])));
    }, []);

    const uiManager = useUIManager({ registerNotification });
    
    useEffect(() => {
        if (PluginManager.isHandlerDefined()) return;

        PluginManager.setHandler({
            uiHandler(ui) {
                ui.register(uiManager);
            }
        });
    }, [uiManager]);

    useEffect(() => {
        (async() => {
            const response = await axios.get<string[]>("/api/plugins");
            for (const scriptPath of response.data) {
                const scriptElement = document.createElement("script");
                scriptElement.type = "module";
                scriptElement.src = scriptPath;
                document.head.append(scriptElement);
            }
        })();
    }, []);

    const createNotification = useCallback((event: ChatBaseEvent) => {
        const elements = Array<React.ReactNode>(0);
        for (const { Element, props } of notifications) {
            if (props.event !== event.event) continue;
            if (props.platform && props.platform !== event.platform) continue;
            elements.push(<Element key={elements.length} event={event}/>);
        }

        return elements;
    }, [notifications]);

    const values = useMemo(() => ({
        createNotification,
        notificationEvents
    }), [createNotification, notificationEvents]);

    return (
        <PluginContext.Provider value={values}>
            {children}
        </PluginContext.Provider>
    )
}
