import React from "react";
import { Socket } from "socket.io-client";

interface AgentContextData {
    socket: Socket;
    host: string;
}

export const AgentContext = React.createContext<AgentContextData | undefined>(undefined);

export function useAgentContext() {
    const context = React.useContext(AgentContext);
    if (context == undefined) {
        throw new Error("Missing AgentContextProvider");
    }

    return context;
}
