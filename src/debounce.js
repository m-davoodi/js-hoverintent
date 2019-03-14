const debounce = (callback, wait) => {
  let timeout
  const cancel = () => {
    clearTimeout(timeout)
  }
  const debounced = (...args) => {
    cancel()
    timeout = setTimeout(callback, +wait, ...args)
  }
  debounced.cancel = cancel
  return debounced
}

export default debounce
