const throttle = (callback, ms) => {
  let isThrottled = false
  let savedArgs

  const wrapper = (...args) => {
    if (isThrottled) {
      savedArgs = args
      return
    }

    callback(args)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false

      if (!savedArgs) return

      wrapper(savedArgs)
      savedArgs = null
    }, ms)
  }

  return wrapper
}

export default throttle
