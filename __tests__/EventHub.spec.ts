import EventHub from '../src'

describe('EventHub unit test', () => {
  let hub: EventHub

  beforeEach(() => {
    hub = new EventHub()
  })

  test('On and emit', () => {
    const handlerOne = jest.fn()
    const handlerTwo = jest.fn()
    hub.on('one-event', handlerOne)
    hub.on(['one-event', 'two-event'], handlerTwo)
    hub.emit('one-event')
    hub.emit('two-event')
    expect(handlerOne).toBeCalledTimes(1)
    expect(handlerTwo).toBeCalledTimes(2)
  })

  test('On and off', () => {
    const handlerOne = jest.fn()
    const handlerTwo = jest.fn()
    hub.on('one-event', handlerOne)
    hub.on('tow-event', handlerTwo)
    hub.off('one-event')
    hub.emit('one-event')
    hub.emit('tow-event')
    expect(handlerOne).not.toBeCalled()
    expect(handlerTwo).toBeCalledTimes(1)
  })

  test('Once and emit', () => {
    const handler = jest.fn()
    hub.once('test-event', handler)
    hub.emit('test-event')
    hub.emit('test-event')
    expect(handler).toBeCalledTimes(1)
  })

  test('Off all event', () => {
    const handler = jest.fn()
    hub.on('one-event', handler)
    hub.on('two-event', handler)
    hub.off()
    hub.emit('one-event')
    hub.emit('two-event')
    expect(handler).not.toBeCalled()
  })

  test('Off handler', () => {
    const handlerOne = jest.fn()
    const handlerTwo = jest.fn()
    hub.on('test-event', handlerOne)
    hub.on('test-event', handlerTwo)
    hub.off('test-event', handlerOne)
    hub.emit('test-event')
    expect(handlerOne).toBeCalledTimes(0)
    expect(handlerTwo).toBeCalledTimes(1)
  })
})
