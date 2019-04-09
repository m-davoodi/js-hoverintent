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

const intent = (
  startDebounceEvent,
  cancelDebounceEvent,
  elements,
  callback,
  wait = 0
) => {
  if (typeof callback !== 'function') {
    throw new TypeError('Expected a function')
  }

  const debouncer = debounce(callback, +wait)

  /**
   * Add startDebounceEvent listener to the given element via debouncer callback.
   *
   * @param {HTMLElement} elm A dom element.
   *
   * @returns {Function} A function to remove debouncer callback from startDebounceEvent listener.
   */
  const startDebouncer = elm => {
    elm.addEventListener(startDebounceEvent, debouncer)
    return () => elm.removeEventListener(startDebounceEvent, debouncer)
  }

  /**
   * Add cancelDebounceEvent listener to the given element via debouncer.cancel callback.
   *
   * @param {HTMLElement} elm A dom element.
   *
   * @returns {Function} A function to remove debouncer.cancel callback from cancelDebounceEvent listener.
   */
  const cancelDebouncer = elm => {
    elm.addEventListener(cancelDebounceEvent, debouncer.cancel)
    return () => elm.removeEventListener(cancelDebounceEvent, debouncer.cancel)
  }

  const removeEventListener = (Array.isArray(elements)
    ? elements
    : [elements]
  ).map(elm => [startDebouncer(elm), cancelDebouncer(elm)])

  const cancel = () => {
    removeEventListener.forEach(([removeStart, removeCancel]) => {
      removeStart()
      removeCancel()
    })
    debouncer.cancel()
  }

  return {
    cancel
  }
}

const enter = (...args) => intent('mouseenter', 'mouseleave', ...args)

const leave = (...args) => intent('mouseleave', 'mouseenter', ...args)

export { enter, leave }
