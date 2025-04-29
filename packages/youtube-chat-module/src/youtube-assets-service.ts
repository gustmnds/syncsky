import assets from "./assets/assets.json"

export function getAsset(name: string): string {
    return (assets as any)[name] || "";
}
