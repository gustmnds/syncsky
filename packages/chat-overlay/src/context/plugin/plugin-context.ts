import { ChatBaseEvent } from "@syncsky/chat-api";
import React from "react";

interface PluginContextData {
    notificationEvents: string[];
    createNotification(notification: ChatBaseEvent): Array<React.ReactNode>;
}

export const PluginContext = React.createContext<PluginContextData | undefined>(undefined);

export function usePluginContext() {
    const context = React.useContext(PluginContext);
    if (!context) {
        throw new Error("Missing PluginContextProvider");
    }

    return context;
}
