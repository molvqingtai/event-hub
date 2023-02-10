import EventHub from '../src'
import { test, describe, expect, beforeEach, vi } from 'vitest'

describe('EventHub unit test', () => {
  let hub: EventHub
  const towEvent = Symbol('tow-event')

  beforeEach(() => {
    hub = new EventHub()
  })

  test('On and emit', () => {
    const handlerOne = vi.fn()
    const handlerTwo = vi.fn()
    hub.on('one-event', handlerOne)
    hub.on(['one-event', towEvent], handlerTwo)
    hub.emit('one-event')
    hub.emit(towEvent)
    expect(handlerOne).toBeCalledTimes(1)
    expect(handlerTwo).toBeCalledTimes(2)
  })

  test('On and off', () => {
    const handlerOne = vi.fn()
    const handlerTwo = vi.fn()
    hub.on('one-event', handlerOne)
    hub.on('tow-event', handlerTwo)
    hub.off('one-event')
    hub.emit('one-event')
    hub.emit('tow-event')
    expect(handlerOne).not.toBeCalled()
    expect(handlerTwo).toBeCalledTimes(1)
  })

  test('Once and emit', () => {
    const handler = vi.fn()
    hub.once('test-event', handler)
    hub.emit('test-event')
    hub.emit('test-event')
    expect(handler).toBeCalledTimes(1)
  })

  test('Off all event', () => {
    const handler = vi.fn()
    hub.on('one-event', handler)
    hub.on(towEvent, handler)
    hub.off()
    hub.emit('one-event')
    hub.emit(towEvent)
    expect(handler).not.toBeCalled()
  })

  test('Off handler', () => {
    const handlerOne = vi.fn()
    const handlerTwo = vi.fn()
    hub.on('test-event', handlerOne)
    hub.on('test-event', handlerTwo)
    hub.off('test-event', handlerOne)
    hub.emit('test-event')
    expect(handlerOne).toBeCalledTimes(0)
    expect(handlerTwo).toBeCalledTimes(1)
  })
})
