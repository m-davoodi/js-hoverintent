import debounce from 'lodash-es/debounce'

const intent = (type, element, func, wait = 0) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  const debouncer = debounce(func, +wait)
  const { cancelDebounce } = debouncer
  const cancel = () => {
    element.removeEventListener(type === 'enter' ? 'mouseenter' : 'mouseout', debouncer)
    element.removeEventListener(type === 'enter' ? 'mouseout' : 'mouseenter', cancelDebounce)
    cancelDebounce()
  }
  element.addEventListener(type === 'enter' ? 'mouseenter' : 'mouseout', debouncer)
  element.addEventListener(type === 'enter' ? 'mouseout' : 'mouseenter', cancelDebounce)

  return {
    cancel
  }
}

const enter = (...args) => intent('enter', ...args)

const out = (...args) => intent('out', ...args)

export { enter, out }
