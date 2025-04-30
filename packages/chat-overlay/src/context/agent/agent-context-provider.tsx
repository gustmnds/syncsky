import React, { useMemo } from "react";
import { AgentContext } from "./use-agent-context";
import { useOverlayContext } from "@/context/overlay";
import { io } from "socket.io-client";

interface AgentContextProviderProps {
    children: React.ReactNode;
}

export function AgentContextProvider({ children }: AgentContextProviderProps) {
    const { streamerMode } = useOverlayContext();    
    const host = useMemo(() => streamerMode ? window.location.origin : "http://127.0.0.1:58325", [streamerMode]);
    const socket = useMemo(() => io(host), [host]);
    const value = useMemo(() => ({ socket, host }), [socket, host]);

    return (
        <AgentContext.Provider value={value}>
            {children}
        </AgentContext.Provider>
    )
}
