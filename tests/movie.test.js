import Movie from '../src/Movie'

describe('Check movie object', () => {
    it('should return an object containing preset parameters', function () {
        const movie = new Movie(
            'Star Wars',
            1999,
            'as2352343',
            'movie',
            'http://www.test.pl'
        )

        expect(movie.title).toBe('Star Wars')
        expect(movie.year).toBe(1999)
        expect(movie.imdbId).toBe('as2352343')
        expect(movie.type).toBe('movie')
        expect(movie.posterUrl).toBe('http://www.test.pl')
    })
})
