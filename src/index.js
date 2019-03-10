const intent = (type, element, func, wait = 0) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  let timer
  function setTimer(event) {
    timer = setTimeout(func.bind(this, event), +wait)
  }
  const pending = () => timer !== undefined
  const cancel = () => {
    element.removeEventListener(type === 'enter' ? 'mouseenter' : 'mouseout', setTimer)
  }
  element.addEventListener(type === 'enter' ? 'mouseenter' : 'mouseout', setTimer)
  element.addEventListener(type === 'enter' ? 'mouseout' : 'mouseenter', () => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  return {
    pending,
    cancel
  }
}

const enter = (...args) => intent('enter', ...args)

const out = (...args) => intent('out', ...args)

export { enter, out }
