export function cm(...classes: Array<string | undefined>): string {
    return classes.filter(Boolean).join(" ");
}
