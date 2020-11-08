import SearchedTypes from './Types/SearchedTypes'

export default class Movie {
    title
    year
    imdbId
    type
    posterUrl
    constructor (title, year, imdbId, type, posterUrl) {
        this.#setTitle(title)
        this.#setYear(year)
        this.#setImdbId(imdbId)
        this.#setType(type)
        this.#setPosterUrl(posterUrl)
    }

    #setTitle(title) {
        this.title = title
    }

    #setYear(year) {
        this.year = year
    }

    #setImdbId(imdbId) {
        this.imdbId = imdbId
    }

    #setType(type) {
        this.type = type
    }

    #setPosterUrl(posterUrl) {
        this.posterUrl = posterUrl
    }
}
