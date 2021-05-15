import isTouch from '~/utils/isTouch'

export default class Scroller implements Scroller {
  bus: EventBus
  container: Element

  isEnabled = true

  wheelDetails: ScrollerWheelDetails = {
    lock: 0,
    timer: null,
    deltas: [null, null, null, null, null, null, null, null, null],
  }

  touchDetails: ScrollerTouchDetails = {
    start: 0,
  }

  constructor(container: Element, bus: EventBus) {
    this.bus = bus
    this.container = container
    this.initListeners()
  }

  initListeners = (): void => {
    if (isTouch()) {
      this.container.addEventListener('touchstart', this.onTouchStart)
    } else {
      this.container.addEventListener('wheel', this.onWheel)
    }
  }

  destroy = (): void => {
    if ('ontouchstart' in window) {
      this.container.removeEventListener('touchstart', this.onTouchStart)
      this.container.removeEventListener('touchend', this.onTouchEnd)
    } else {
      this.container.removeEventListener('wheel', this.onWheel)
    }
  }

  disable = (): void => {
    this.isEnabled = false
  }

  enable = (): void => {
    this.isEnabled = true
  }

  hasPeek = (): boolean => {
    const { deltas, lock } = this.wheelDetails

    if (lock > 0) {
      this.wheelDetails.lock--
      return false
    }

    if (deltas[0] === null) return false

    if (
      deltas[0] < deltas[4] &&
      deltas[1] <= deltas[4] &&
      deltas[2] <= deltas[4] &&
      deltas[3] <= deltas[4] &&
      deltas[5] <= deltas[4] &&
      deltas[6] <= deltas[4] &&
      deltas[7] <= deltas[4] &&
      deltas[8] < deltas[4]
    )
      return true

    return false
  }

  getScrollable = (target: EventTarget): Element | null => {
    let node = target as Element

    while (node) {
      const style = window.getComputedStyle(node)

      if (
        node.clientHeight < node.scrollHeight &&
        [style.overflow, style.overflowY].some((rule) =>
          ['auto', 'scroll'].includes(rule),
        )
      )
        return node
      node = node.parentElement as Element
    }

    return null
  }

  checkScrollAvailability = (
    target: Element | null,
  ): { prev: boolean; next: boolean } => {
    if (!target)
      return {
        prev: true,
        next: true,
      }

    return {
      prev: target.scrollTop <= 0,
      next: target.scrollTop + target.clientHeight >= target.scrollHeight,
    }
  }

  move = (target: EventTarget, direction: ScrollerDirection): void => {
    const scrollable = this.getScrollable(target)
    const canScroll = this.checkScrollAvailability(scrollable)

    if (this.isEnabled && canScroll[direction]) {
      this.bus.emit('scroll:start')
      this.bus.emit(`move:${direction}`)
    }
  }

  onWheel = (event: Event): void => {
    const e = event as WheelEvent
    const delta = e.deltaY * -3

    const direction: ScrollerDirection = e.deltaY > 0 ? 'next' : 'prev'

    if (this.hasPeek()) this.move(e.target, direction)

    this.wheelDetails.deltas.shift()
    this.wheelDetails.deltas.push(Math.abs(delta))

    clearTimeout(this.wheelDetails.timer)
    this.wheelDetails.timer = setTimeout(() => {
      this.bus.emit('scroll:end')
    }, 200)
  }

  onTouchStart = (event: Event): void => {
    const e = event as TouchEvent

    if (e.touches.length > 1) return

    this.touchDetails.start = e.touches[0].clientY

    this.container.addEventListener('touchend', this.onTouchEnd)
  }

  onTouchEnd = (event: Event): void => {
    this.container.removeEventListener('touchend', this.onTouchEnd)

    const e = event as TouchEvent

    if (e.changedTouches.length > 1) return

    const eventTouch = e.changedTouches[0]

    if (Math.abs(eventTouch.clientY - this.touchDetails.start) < 70) return

    const direction: ScrollerDirection =
      this.touchDetails.start > eventTouch.clientY ? 'next' : 'prev'

    this.move(e.target, direction)

    this.touchDetails.start = 0
  }
}
