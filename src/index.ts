export default class EventHub {
  private readonly hub = new Map<string, Set<Function>>()
  private readonly onceEvents = new Set<string>()

  on(event: string | string[], handler: Function): void {
    ;[event].flat().forEach((event) => {
      this.hub.set(event, this.hub.get(event)?.add(handler) ?? new Set<Function>([handler]))
    })
  }

  once(event: string, handler: Function): void {
    this.on(event, handler)
    this.onceEvents.add(event)
  }

  emit(event: string, ...args: unknown[]): void {
    this.hub.get(event)?.forEach((handler) => {
      handler(...args)
      this.onceEvents.has(event) && this.onceEvents.delete(event) && this.hub.delete(event)
    })
  }

  off(event?: string | string[], handler?: Function): void {
    if (event === undefined) {
      this.hub.clear()
    } else {
      ;[event].flat().forEach((event) => {
        if (handler === undefined) {
          this.hub.delete(event)
        } else {
          this.hub.get(event)?.forEach((h, _, handlers) => h === handler && handlers.delete(handler))
        }
      })
    }
  }
}
