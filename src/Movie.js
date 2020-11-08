import SearchedTypes from './Types/SearchedTypes'

export default class Movie {
    title
    year
    imdbId
    type
    posterUrl
    constructor ({Title, Year, imdbID, Type, Poster}) {
        this.#setTitle(Title)
        this.#setYear(Year)
        this.#setImdbId(imdbID)
        this.#setType(Type)
        this.#setPosterUrl(Poster)
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
