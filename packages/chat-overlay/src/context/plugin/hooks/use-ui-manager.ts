import { useAgentContext } from "@/context/agent";
import { UIManager } from "@syncsky/chat-api";
import { useMemo } from "react";

interface UseUIManagerData {
    registerNotification: UIManager["registerNotification"]
}

export class FrontUIManager implements UIManager {
    constructor(
        private readonly host: string,
        public readonly registerNotification: UIManager["registerNotification"]
    ) {}

    resolvePath(pluginName: string, path: string): string {
        const assetURL = new URL(`/api/plugins/${pluginName}/${path}`, this.host);
        return assetURL.toString();
    }
}

export function useUIManager({ registerNotification }: UseUIManagerData): UIManager {
    const { host } = useAgentContext();
    return useMemo(
        () => new FrontUIManager(host, registerNotification),
        [registerNotification, host]
    );
}
