import debounce from 'lodash-es/debounce'

const TYPE_ENTER = 'enter'
const TYPE_OUT = 'out'

const intent = (type, element, func, wait = 0) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  const debouncer = debounce(func, +wait)
  const cancelDebounce = debouncer.cancel
  const cancel = () => {
    element.removeEventListener(
      type === TYPE_ENTER ? 'mouseenter' : 'mouseout',
      debouncer
    )
    element.removeEventListener(
      type === TYPE_ENTER ? 'mouseout' : 'mouseenter',
      cancelDebounce
    )
    cancelDebounce()
  }
  element.addEventListener(
    type === TYPE_ENTER ? 'mouseenter' : 'mouseout',
    debouncer
  )
  element.addEventListener(
    type === TYPE_ENTER ? 'mouseout' : 'mouseenter',
    cancelDebounce
  )

  return {
    cancel
  }
}

const enter = (...args) => intent(TYPE_ENTER, ...args)

const out = (...args) => intent(TYPE_OUT, ...args)

export { enter, out }
