class EventBus implements EventBus {
  events: Map<string, Set<EventBusCallback>> = new Map()

  on = (eventName: string, callback: EventBusCallback): (() => void) => {
    if (!this.events.has(eventName)) this.events.set(eventName, new Set())

    this.events.get(eventName).add(callback)

    return () => {
      this.off(eventName, callback)
    }
  }

  off = (eventName: string, callback: EventBusCallback): void => {
    this.events.get(eventName)?.delete(callback)
  }

  emit = (eventName: string, eventObject?: EventBusEvent): void => {
    this.events.get(eventName)?.forEach((cb) => cb(eventObject))
  }
}

export default EventBus
