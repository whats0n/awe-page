import Scroller from './Scroller'
import EventBus from './EventBus'

export default class AwePage implements AwePage {
  options: AwePageOptions
  defaultOptions: AwePageOptions = {
    containerSelector: '.bp-container',
    sectionSelector: '.bp-section',
    speed: 700,
  }

  index = 0
  prevIndex: number | null = null
  limit = 0

  get animationEvent(): EventBusEvent {
    return {
      prev: this.prevIndex,
      current: this.index,
    }
  }

  $refs: AwePageRefs
  $styles: HTMLStyleElement

  bus: EventBus
  scroller: Scroller

  constructor(options: AwePageOptions) {
    this.initOptions(options)
    this.initDOM()
    this.initStyles()

    this.bus = new EventBus()
    this.scroller = new Scroller(this.$refs.container, this.bus)

    this.initListeners()

    if (typeof this.options.onLoad === 'function')
      this.options.onLoad(this.animationEvent)
  }

  initOptions = (options: AwePageOptions): void => {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  initDOM = (): void => {
    const container: Element = document.querySelector(
      this.options.containerSelector,
    )

    this.$refs = {
      container,
      sections: [...container.querySelectorAll(this.options.sectionSelector)],
    }

    this.$refs.container.classList.add('bp-container')
    this.$refs.sections.forEach((section: Element): void =>
      section.classList.add('bp-section'),
    )

    this.limit = this.$refs.sections.length

    if (
      typeof this.options.initialIndex === 'number' &&
      this.options.initialIndex > 0 &&
      this.options.initialIndex < this.limit
    ) {
      this.index = this.options.initialIndex
      this.setTransform()

      // eslint-disable-next-line
      window.getComputedStyle(this.$refs.container).height
    }
  }

  initStyles = (): void => {
    const selector = 'style[data-bp="inited"]'
    const style: HTMLStyleElement = document.querySelector(selector)

    if (style) {
      this.$styles = style
      return
    }

    this.$styles = document.createElement('style')
    this.$styles.dataset.bp = 'inited'
    this.$styles.innerHTML = `
      body {
        overflow: hidden;
        height: 100vh;
      }

      .bp-container {
        position: relative;
        transform: translateY(0);
        transition: transform ${this.options.speed}ms;
      }

      .bp-section {
        width: 100vw;
        height: 100vh;
        overflow: auto;
      }
    `

    document.head.appendChild(this.$styles)
  }

  initListeners = (): void => {
    this.bus.on('move:prev', this.onPrev)
    this.bus.on('move:next', this.onNext)
    this.$refs.container.addEventListener('transitionend', this.onAnimationEnd)
  }

  destroy = (): void => {
    this.scroller.destroy()
    document.head.removeChild(this.$styles)
  }

  animate = (index: number): void => {
    this.prevIndex = this.index
    this.index = index

    this.bus.emit('animation:start', this.animationEvent)

    this.scroller.disable()
    this.setTransform()
  }

  setTransform = (): void => {
    const y: number = (this.index / this.limit) * 100
    this.$refs.container.setAttribute('style', `transform: translateY(${-y}%)`)
  }

  onAnimationEnd = (e: Event): void => {
    const event = e as TransitionEvent
    if (e.target !== this.$refs.container || event.propertyName !== 'transform')
      return

    this.scroller.enable()
    this.bus.emit('animation:end', this.animationEvent)
  }

  onPrev = (): void => {
    if (this.index <= 0) return
    this.animate(this.index - 1)
  }

  onNext = (): void => {
    if (this.index >= this.limit - 1) return
    this.animate(this.index + 1)
  }
}
