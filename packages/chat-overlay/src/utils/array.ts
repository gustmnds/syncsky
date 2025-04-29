export function appendItem<T>(items: T[], item: T, max: number): T[] {
    return [...items, item].slice(-max);
}

export function prependItem<T>(items: T[], item: T, max: number): T[] {
    return [item, ...items].slice(0, max);
}
