export default class EventHub {
    private readonly hub;
    private readonly onceEvents;
    on(event: string, handler: Function): void;
    once(event: string, handler: Function): void;
    emit(event: string, args?: []): void;
    off(event?: string | string[], handler?: Function): void;
}
