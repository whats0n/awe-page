const debounce = (callback, ms) => {
  let timer = null

  const wrapper = (...args) => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms, ...args)
  }

  return wrapper
}

export default debounce
