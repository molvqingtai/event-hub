import EventHub from '../../src'
import 'jest-extended'

jest.mock('../../src')

describe('EventHub', () => {
  test('instance', () => {
    const evenHub = new EventHub()

    // @ts-expect-error https://github.com/facebook/jest/issues/8137
    const hub = jest.spyOn(evenHub, 'hub', 'get')
    expect(hub).toBeEmpty()
  })
})
