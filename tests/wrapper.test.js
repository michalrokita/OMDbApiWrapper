import OmdbApiWrapper from '../build/omdb-api-wrapper'

it('should initialize without errors', function () {
    expect(() => { new OmdbApiWrapper('345') }).not.toThrowError()
})

it('should initialize with error if apiKey is missing', function () {
    expect(() => { new OmdbApiWrapper() }).toThrowError()
})

describe('Find by ID and Title should return objects', () => {
    it('should return an object with a movie', async function () {
        const wrapper = new OmdbApiWrapper('xxxxxx')
        const movie = await wrapper.findById('test')
        const movie2 = await wrapper.findByTitle('test')

        expect(typeof movie).toBe('object')
        expect(typeof movie2).toBe('object')
    })
})


describe('Movie search collection should work', () => {
    it('should prevent from changing the page when outside range', async function () {
        const wrapper = new OmdbApiWrapper('xxxxxx')
        const collection = await wrapper.searchByTitle('test')

        let errorDown = false
        let errorTop = false

        try {
            await collection.page(-1)
        } catch (error) {
            errorDown = true
        }

        try {
            await collection.page(101)
        } catch (error) {
            errorTop = true
        }

        expect(errorDown).toBe(true)
        expect(errorTop).toBe(true)
    })

    it('should return an array', async function () {
        const wrapper = new OmdbApiWrapper('xxxxxx')
        const collection = await wrapper.searchByTitle('test')
        const movies = collection.results()
        const isArray = Array.isArray(movies)

        expect(isArray).toBe(true)
    })
})

