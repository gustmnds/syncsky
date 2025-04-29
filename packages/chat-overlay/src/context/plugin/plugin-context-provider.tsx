import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ChatBaseEvent, NotificationSettings, PluginManager, UIManager } from "@syncsky/chat-api";
import { PluginContext } from "./plugin-context"
import axios from "axios"

export interface PluginContextProviderProps {
    children: React.ReactNode;
}

export function PluginContextProvider({ children }: PluginContextProviderProps) {

    const [notifications, setNotifications] = useState(Array<{ props: NotificationSettings<ChatBaseEvent>, Element: React.FC<{ event: ChatBaseEvent }> }>(0));
    const [notificationEvents, setNotificationEvents] = useState(Array<string>());
    useEffect(() => {
        const uiManager: UIManager = {
            registerNotification(element: React.FC<{ event: ChatBaseEvent }>, props) {
                setNotifications((notifications) => [...notifications, { Element: element, props }]);
                setNotificationEvents((events) => Array.from(new Set([...events, props.event])));
            }
        };

        PluginManager.setHandler({
            async uiHandler(ui) {
                console.log("UI", ui);
                ui.register(uiManager);
            }
        });
    }, []);

    useEffect(() => {
        (async() => {
            const response = await axios.get<string[]>("/api/plugins");
            for (const scriptPath of response.data) {
                const scriptElement = document.createElement("script");
                scriptElement.type = "module";
                scriptElement.src = scriptPath;
                document.body.append(scriptElement);
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
