declare interface AwePageOptions {
  containerSelector?: string
  sectionSelector?: string
  speed?: number
  initialIndex?: number,
  onLoad?(e: EventBusEvent): void
}

declare interface AwePageRefs {
  container: Element
  sections: Array<Element>
}

declare interface AwePage {
  bus: EventBus

  options: AwePageOptions
  refs: AwePageRefs

  destroy(): void
}
