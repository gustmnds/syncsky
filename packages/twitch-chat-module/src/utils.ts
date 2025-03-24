export function getColorFromString(input: string) {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & 0xFFFFFFFF;
    }

    const hue = Math.abs(hash) % 360;
    const saturation = 70 + (Math.abs(hash) % 30);
    const lightness = 50 + (Math.abs(hash) % 20);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
