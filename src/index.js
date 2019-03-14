import debounce from './debounce'

const TYPE_ENTER = 'enter'
const TYPE_OUT = 'out'

const intent = (type, elements, func, wait = 0) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  const elementsArray = !Array.isArray(elements) ? [elements] : [...elements]
  const debouncer = debounce(func, +wait)

  const addEventListenerToElement = elm => {
    elm.addEventListener(
      type === TYPE_ENTER ? 'mouseenter' : 'mouseleave',
      debouncer
    )
    elm.addEventListener(
      type === TYPE_ENTER ? 'mouseleave' : 'mouseenter',
      debouncer.cancel
    )
  }
  const removeEventListenerFromElement = elm => {
    elm.removeEventListener(
      type === TYPE_ENTER ? 'mouseenter' : 'mouseleave',
      debouncer
    )
    elm.removeEventListener(
      type === TYPE_ENTER ? 'mouseleave' : 'mouseenter',
      debouncer.cancel
    )
  }
  elementsArray.forEach(addEventListenerToElement)
  const cancel = () => {
    elementsArray.forEach(removeEventListenerFromElement)
    debouncer.cancel()
  }
  return {
    cancel
  }
}

const enter = (...args) => intent(TYPE_ENTER, ...args)

const out = (...args) => intent(TYPE_OUT, ...args)

export { enter, out }
