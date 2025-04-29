import { getLocalIp } from "./utils/local-ip";

export const APP_PORT = 58325;
export const OVERLAY_URL = process.env.OVERLAY_URL!;

export const LOCAL_URL = "http://" + getLocalIp() + ":" + APP_PORT;
export const ORIGINS = [LOCAL_URL, OVERLAY_URL];
