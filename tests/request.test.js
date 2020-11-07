import { get } from '../src/helpers/request'

describe('Test request helper', () => {
    it('should throw an invalid url exception', () => {
        expect(get).toThrowError()
    })
})
