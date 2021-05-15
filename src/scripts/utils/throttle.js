function throttle(callback, ms) {
  let isThrottled = false
  let savedArgs
  let savedContext

  const wrapper = (...args) => {
    if (isThrottled) {
      savedArgs = args
      savedContext = this
      return
    }

    callback.apply(this, args)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedContext, savedArgs)
        savedArgs = null
        savedContext = null
      }
    }, ms)
  }

  return wrapper
}

export default throttle
