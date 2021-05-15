export default () =>
  'ontouchstart' in window ||
  navigator.msMaxTouchPoints > 0 ||
  navigator.maxTouchPoints
