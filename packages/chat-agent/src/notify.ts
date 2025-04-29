import { exec, spawn } from "child_process"
import { isSea } from "node:sea";

export function Notify(message: string) {
    return new Promise<void>((resolve) => {
        if (!isSea()) {
            console.log("[NOTIFY]", message);
            return resolve();
        }
        const process = exec(`mshta vbscript:msgbox("${message}",64,"Syncsky Agent")(window.close)`, { windowsHide: true });
        process.on("exit", () => resolve());
    });
}
