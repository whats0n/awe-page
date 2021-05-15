declare interface EventBus {
  events: Map<string, Set<EventBusCallback>>

  on: {
    (eventName: string, callback: EventBusCallback): {
      (eventName: string, callback: EventBusCallback): void
    }
  }

  off: {
    (eventName: string, callback: EventBusCallback): void
  }

  emit: {
    (eventName: string, eventObject?: EventBusEvent): void
  }
}

declare interface EventBusEvent {
  [key: string]: any
}

declare type EventBusCallback = (event?: EventBusEvent) => any
