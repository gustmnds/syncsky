export interface ChatBaseEvent<E extends string = string, V = unknown> {
    platform: string;
    event: E;
    value: V;
};
