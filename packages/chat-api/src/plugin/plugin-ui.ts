import React from "react";
import { ChatBaseEvent } from "../dto";

export interface NotificationSettings<T extends ChatBaseEvent> {
    event: T["event"];
    platform?: string;
};

export interface NotificationProps<T extends ChatBaseEvent> {
    event: T
}

export interface UIManager {
    registerNotification<T extends ChatBaseEvent>(
        element: React.FC<NotificationProps<T>>, 
        settings: NotificationSettings<T>
    ): void;
};

export interface PluginUI {
    register(ui: UIManager): void;
}

export type PluginUIHandler = (ui: PluginUI) => Promise<void>;
