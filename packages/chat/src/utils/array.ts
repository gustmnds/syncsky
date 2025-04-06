export function appendItem<T>(items: T[], item: T, max: number): T[] {
    return [...items, item].slice(-max);
}
