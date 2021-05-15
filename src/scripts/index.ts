import '../styles/reset'
import AwePage from './app'

const bp = new AwePage({
  containerSelector: '.js-sections',
  sectionSelector: '.js-section',
  speed: 1000,
  onLoad: (e) => console.log('render', e),
})

bp.bus.on('animation:start', (e) => {
  console.log('start', e)
})

bp.bus.on('animation:end', (e) => {
  console.log('end', e)
})

declare global {
  interface Window {
    bp: AwePage
  }
}

window.bp = bp
console.log(bp)
