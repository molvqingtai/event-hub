import EventHub from '../src'

describe('EventHub', () => {
  test('Instance', () => {
    expect(new EventHub()).toBeInstanceOf(EventHub)
  })

  test('On and emit', () => {
    const hub = new EventHub()
    const handler = jest.fn()
    hub.on('test-event', handler)
    hub.emit('test-event')
    expect(handler).toBeCalledTimes(1)
  })

  test('On and off', () => {
    const hub = new EventHub()
    const handler = jest.fn()
    hub.on('test-event', handler)
    hub.off('test-event')
    hub.emit('test-event')
    expect(handler).not.toBeCalled()
  })

  test('Once and emit', () => {
    const hub = new EventHub()
    const handler = jest.fn()
    hub.once('test-event', handler)
    hub.emit('test-event')
    hub.emit('test-event')
    expect(handler).toBeCalledTimes(1)
  })

  test('Off all event', () => {
    const hub = new EventHub()
    const handler = jest.fn()
    hub.on('test-event', handler)
    hub.on('test-event', handler)
    hub.off()
    hub.emit('test-event')
    expect(handler).not.toBeCalled()
  })

  test('off handler', () => {
    const hub = new EventHub()
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
