export default class EventHub {
  private readonly listeners = new Map<string, Set<{ once: boolean; handler: Function }>>()

  private add(event: string | string[], handler: Function, once: boolean): void {
    ;[event].flat().forEach((event) => {
      this.listeners.set(event, this.listeners.get(event)?.add({ once, handler }) ?? new Set([{ once, handler }]))
    })
  }

  on(event: string | string[], handler: Function): void {
    this.add(event, handler, false)
  }

  once(event: string, handler: Function): void {
    this.add(event, handler, true)
  }

  emit(event: string, ...args: unknown[]): void {
    this.listeners.get(event)?.forEach(({ once, handler }) => {
      handler(...args)
      once && this.listeners.delete(event)
    })
  }

  off(event?: string | string[], handler?: Function): void {
    if (event === undefined) {
      this.listeners.clear()
    } else {
      ;[event].flat().forEach((event) => {
        if (handler === undefined) {
          this.listeners.delete(event)
        } else {
          this.listeners.get(event)?.forEach((payload, _, payloads) => {
            handler === payload.handler && payloads.delete(payload)
          })
        }
      })
    }
  }
}
