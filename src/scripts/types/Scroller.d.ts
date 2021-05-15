declare interface Scroller {
  bus: EventBus
  globals: ScrollerWheelDetails
  touchDetails: ScrollerTouchDetails

  enable(): void
  disable(): void
}

declare interface ScrollerWheelDetails {
  lock: number
  timer: ReturnType<typeof setTimeout>
  deltas: Array<number | null>
}

declare interface ScrollerTouchDetails {
  start: number
}

declare type ScrollerDirection = 'next' | 'prev'
