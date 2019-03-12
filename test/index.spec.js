import * as sinon from 'sinon'
import { enter } from '../build/umd/hoverintent'

let clock

beforeEach(() => {
  clock = sinon.useFakeTimers()
})

afterEach(() => {
  clock.restore()
})

describe('enter', () => {
  it('element should not hover immediately when mouse enter', () => {
    /* eslint no-undef: "off", func-names: "off" */
    document.body.innerHTML = '<div><button id="button" /></div>'
    const element = document.getElementById('button')
    const callback = jest.fn()
    const event = new MouseEvent('mouseenter')
    enter(element, callback, 100)
    element.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(0)
    clock.tick(50)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
