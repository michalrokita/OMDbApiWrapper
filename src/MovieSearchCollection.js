import { get } from './helpers/request'
import Movie from './Movie'

export default class MovieSearchCollection {
    #searchResults
    #params
    #api
    #currentPage
    #totalResults
    #minPage = 1
    #maxPage = 100

    constructor (apiResponse, params, api, page = 1) {
        this.#searchResults = apiResponse.Search
        this.#totalResults = apiResponse.totalResults
        this.#params = params
        this.#api = api
        this.#currentPage = page
    }

    results() {
        const results = []

        for (const result of this.#searchResults) {
            results.push(new Movie(result))
        }

        return results
    }

    async page(page) {
        if (isNaN(page)) {
            throw new Error('Page must be a number')
        }

        if (page < this.#minPage || page > this.#maxPage) {
            throw new Error('Page number is invalid')
        }

        this.#currentPage = page
        await this.#fetch()
    }

    async prevPage() {
        await this.page(this.#currentPage - 1)
    }

    async nextPage() {
        await this.page(this.#currentPage + 1)
    }

    totalResults() {
        return this.#totalResults
    }

    perPage() {
        return 10
    }

    currentPage() {
        return this.#currentPage
    }

    async #fetch() {
        this.#params.page = this.#currentPage

        this.#searchResults = (await get(this.#api, this.#params)).Search
    }

}
