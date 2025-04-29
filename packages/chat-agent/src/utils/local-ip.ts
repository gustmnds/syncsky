import os from "os";

export function getLocalIp() {
    const interfaces = os.networkInterfaces();
    let currentIp = "";
    for (const osInterface of Object.values(interfaces)) {
        if (!osInterface) return;
        for (const device of osInterface) {
            if (device.family == "IPv4" && !device.internal) {
                currentIp = device.address;
            }
        }
    }

    return currentIp;
}
