import * as sinon from 'sinon'
import HoverIntent from '../src/index'

let clock
let element

beforeEach(() => {
  clock = sinon.useFakeTimers()
  document.body.innerHTML = '<div><button id="button" /></div>'
  element = document.getElementById('button')
})

afterEach(() => {
  clock.restore()
})
/* eslint no-undef: "off", func-names: "off", no-new: "off" */
describe('enter', () => {
  it('the element should not hover immediately when the mouse pointer enters the element', () => {
    const callback = jest.fn()
    const event = new MouseEvent('mouseenter')

    new HoverIntent('#button', callback, () => {})

    element.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('the callback should not be called when the mouse pointer leaves the element before the wait time', () => {
    const callback = jest.fn()
    const enterEvent = new MouseEvent('mouseenter')
    const leaveEvent = new MouseEvent('mouseleave')

    new HoverIntent('#button', callback, () => {})

    element.dispatchEvent(enterEvent)
    clock.tick(50)
    element.dispatchEvent(leaveEvent)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('cancel method should work', () => {
    const callback = jest.fn()
    const enterEvent = new MouseEvent('mouseenter')

    const intent = new HoverIntent('#button', callback, () => {})

    element.dispatchEvent(enterEvent)
    intent.cancel()
    clock.tick(100)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})

describe('leave', () => {
  it('the callback should not be called immediately when the mouse pointer leaves the element', () => {
    const callback = jest.fn()
    const event = new MouseEvent('mouseleave')

    new HoverIntent('#button', () => {}, callback)

    element.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('the callback should not be called when the mouse pointer enters the element before the wait time', () => {
    const callback = jest.fn()
    const enterEvent = new MouseEvent('mouseenter')
    const leaveEvent = new MouseEvent('mouseleave')

    new HoverIntent('#button', () => {}, callback)

    element.dispatchEvent(leaveEvent)
    clock.tick(50)
    element.dispatchEvent(enterEvent)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('cancel method should work', () => {
    const callback = jest.fn()
    const enterEvent = new MouseEvent('mouseleave')

    const intent = new HoverIntent('#button', () => {}, callback)

    element.dispatchEvent(enterEvent)
    intent.cancel()
    clock.tick(100)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})

describe('enter and leave', () => {
  it('throws if callback is not a function', () => {
    expect(() => new HoverIntent('#button', null, () => {})).toThrow()
    expect(() => new HoverIntent('#button', () => {}, null)).toThrow()
  })

  it('should work well together', () => {
    const enterCallback = jest.fn()
    const leaveCallback = jest.fn()
    const enterEvent = new MouseEvent('mouseenter')
    const leaveEvent = new MouseEvent('mouseleave')

    new HoverIntent('#button', enterCallback, leaveCallback)

    // the mouse enters the element
    element.dispatchEvent(enterEvent)

    // after 50ms, the mouse leaves before the enter wait time(=100ms)
    clock.tick(50)
    element.dispatchEvent(leaveEvent)
    expect(enterCallback).toHaveBeenCalledTimes(0)

    // after 50ms again the mouse again enters before the leave wait time(=100ms)
    // so leave callback won't be called
    clock.tick(50)
    element.dispatchEvent(enterEvent)
    expect(leaveCallback).toHaveBeenCalledTimes(0)

    // at this time the mouse has just entered the element
    clock.tick(50)
    expect(enterCallback).toHaveBeenCalledTimes(0)
    expect(leaveCallback).toHaveBeenCalledTimes(0)

    // when the enter waite time spends, enter callback will be called
    clock.tick(50)
    expect(enterCallback).toHaveBeenCalledTimes(1)
    expect(leaveCallback).toHaveBeenCalledTimes(0)

    // now the pointer leaves the element
    element.dispatchEvent(leaveEvent)
    expect(leaveCallback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(leaveCallback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(leaveCallback).toHaveBeenCalledTimes(1)
  })
})
