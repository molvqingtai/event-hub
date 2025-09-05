type Event = string | number | symbol
type Listener = (...args: any[]) => void


export default class EventHub<EventMap extends Record<Event, Listener> = Record<Event, Listener>> {
  readonly listeners = new Map<Event, Set<{ once: boolean; handler: Listener }>>()

  constructor() {
    this.add = this.add.bind(this)
    this.on = this.on.bind(this)
    this.once = this.once.bind(this)
    this.emit = this.emit.bind(this)
    this.off = this.off.bind(this)
  }

  add<K extends keyof EventMap>(event: K | K[], handler: EventMap[K], once: boolean): void {
    ;[event].flat().forEach((event) => {
      this.listeners.set(event, this.listeners.get(event)?.add({ once, handler }) ?? new Set([{ once, handler }]))
    })
  }

  on<K extends keyof EventMap>(event: K, handler: EventMap[K]): void
  on<K extends keyof EventMap>(event: K[], handler: EventMap[K]): void
  on<K extends keyof EventMap>(event: K | K[], handler: EventMap[K]): void {
    this.add(event, handler, false)
  }

  once<K extends keyof EventMap>(event: K, handler: EventMap[K]): void {
    this.add(event, handler, true)
  }

  emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void {
    this.listeners.get(event)?.forEach(({ once, handler }) => {
      handler(...args)
      once && this.listeners.delete(event)
    })
  }

  off<K extends keyof EventMap>(event?: K, handler?: EventMap[K]): void
  off<K extends keyof EventMap>(event?: K[], handler?: EventMap[K]): void
  off<K extends keyof EventMap>(event?: K | K[], handler?: EventMap[K]): void {
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
