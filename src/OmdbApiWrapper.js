import { get } from './helpers/request'
import MovieSearchCollection from './MovieSearchCollection'
import SearchedTypes from './Types/SearchedTypes'
import PlotTypes from './Types/PlotTypes'
import ResponseTypes from './Types/ResponseTypes'

export class OmdbApiWrapper {
    #apiKey
    #api
    #allowedResponseTypes
    #allowedPlotTypes
    #allowedSearchedTypes
    #responseType
    #plotType
    #searchedType
    #releaseYear

    /**
     *
     * @param apiKey
     */
    constructor(apiKey = '') {
        this.setApiKey(apiKey)
        this.#api = 'http://www.omdbapi.com/'
        this.#allowedResponseTypes = ResponseTypes
        this.#allowedPlotTypes = PlotTypes
        this.#allowedSearchedTypes = SearchedTypes
        this.#responseType = PlotTypes[0]
        this.#plotType = SearchedTypes[0]
        this.#searchedType = ''
        this.#releaseYear = ''
    }

    setApiKey(apiKey = '') {
        if (typeof apiKey !== 'string' || apiKey.length === 0) {
            throw new Error('Valid api key is required!')
        }
        this.#apiKey = apiKey

        return this
    }

    resetFilters() {
        this.#searchedType = ''
        this.#releaseYear = ''

        return this
    }

    /**
     *
     * @param type json|xml
     * @return {OmdbApiWrapper}
     */
    setResponseType(type = 'json') {
        if (this.#allowedResponseTypes.contains(type)) {
            this.#responseType = type
        } else {
            console.warn('Provided response type is invalid, thus the last was left as it was.')
        }

        return this
    }

    /**
     *
     * @param type short|full
     * @return {OmdbApiWrapper}
     */
    setPlotType(type = 'short') {
        if (this.#allowedPlotTypes.contains(type)) {
            this.#plotType = type
        } else {
            console.warn('Provided plot type is invalid, thus the last was left as it was.')
        }

        return this
    }

    /**
     *
     * @param type empty|movie|series|episode
     * @return {OmdbApiWrapper}
     */
    setSearchedType(type = '') {
        if (this.#allowedPlotTypes.contains(type)) {
            this.#searchedType = type
        } else {
            console.warn('Provided searched type is invalid, thus the last was left as it was.')
        }

        return this
    }

    /**
     *
     * @return {OmdbApiWrapper}
     * @param year empty|integer
     */
    setReleaseYear(year = '') {
        if (!isNaN(year)) {
            this.#releaseYear = year
        } else {
            console.warn('Provided value is invalid, thus the last was left as it was.')
        }

        return this
    }

    /**
     *
     * @param imdbId
     * @return {Promise<*>}
     */
    async findById(imdbId = '') {
        if (typeof imdbId !== 'string') {
            throw new Error('IMDb ID must be a string')
        }

        const params = this.#buildParamsObject({ i: imdbId })

        return await this.#makeRequest(params)
    }

    /**
     *
     * @param title
     * @return {Promise<*>}
     */
    async findByTitle(title = '') {
        if (typeof title !== 'string') {
            throw new Error('Title must be a string')
        }

        const params = this.#buildParamsObject({ t: title })

        return await this.#makeRequest(params)
    }

    /**
     *
     * @param searchedTitle
     * @return {MovieSearchCollection}
     */
    async searchByTitle(searchedTitle = '') {
        if (typeof searchedTitle !== 'string') {
            throw new Error('Searched title must be a string')
        }

        const params = this.#buildParamsObject({ s: searchedTitle })

        const results = await this.#makeRequest(params)

        if (typeof results.Error !== 'undefined') {
            throw new Error(results.Error)
        }

        return new MovieSearchCollection(results, params, this.#api)
    }

    /**
     *
     * @param inject
     * @return {{r: *, apikey: *, plot: *, y: *, page: number, type: *}}
     */
    #buildParamsObject(inject = {}) {
        const params = {
            apikey: this.#apiKey,
            type: this.#searchedType,
            y: this.#releaseYear,
            plot: this.#plotType,
            r: this.#responseType,
            page: 1
        }

        for (const [key, value] of Object.entries(inject)) {
            params[key] = value
        }

        return params
    }

    /**
     *
     * @param params
     * @return {Promise<*>}
     */
    async #makeRequest(params) {
        return await get(this.#api, params)
    }
}

(function () {
    window.OmdbApiWrapper = window.OmdbApiWrapper || new OmdbApiWrapper('xxxxxx')
})()
