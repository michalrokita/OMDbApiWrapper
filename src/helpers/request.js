const InvalidUrlException = () => {
    return new Error('Invalid url provided')
}

/**
 * Throws an error when the provided string is not a valid url
 * @param url
 * @throws InvalidUrlException
 */
const validateUrl = (url = '') => {
    try {
        new URL(url)
    } catch (error) {
        throw new InvalidUrlException()
    }
}

/**
 *
 * @param url
 * @param body
 * @param method
 * @return Object
 * @throws InvalidUrlException
 * @throws Error
 */
const request = async (url = '', method = 'POST', body = null) => {
    validateUrl(url)

    let headers = {}

    if (method === 'POST') {
        headers['Content-Type'] = 'application/json'
    }

    return await fetch(url, {
        method,
        body,
        headers
    })
        .then(response => response.json())
        .catch(error => {
            throw new Error(`Request failed: ${error}`)
        })
}

/**
 *
 * @param params
 * @return String
 */
const buildQueryString = (params = {}) => {
    let queryString = '?'

    for (let [key, value] of Object.entries(params)) {

        if (!['string', 'number'].includes(typeof value)) {
            value = JSON.stringify(value)
        }

        queryString += `${key}=${value}&`
    }

    return queryString
}

/**
 *
 * @param base
 * @param params
 * @return URL
 */
const buildUrl = (base = '', params = {}) => {
    return new URL(buildQueryString(params), base)
}

let get

if (process.env.NODE_ENV === 'production') {

    /**
     *
     * @param url
     * @param data
     * @return Object
     * @throws InvalidUrlException
     * @throws Error
     */
    get = async (url = '', data = {}) => {
        validateUrl(url)

        url = buildUrl(url, data)

        return await request(url, 'GET')
    }

} else {

    /**
     *
     * @param url
     * @param data
     * @return Object
     * @throws InvalidUrlException
     * @throws Error
     */
    get = async (url = '', data = {}) => {
        validateUrl(url)

        if (url === 'http://movie.com') {
            return JSON.parse(`{"Title":"Beta Test","Year":"2016","Rated":"Not Rated","Released":"22 Jul 2016","Runtime":"88 min","Genre":"Action, Sci-Fi, Thriller","Director":"Nicholas Gyeney","Writer":"Nicholas Gyeney (story), Nicholas Gyeney, André Kirkman","Actors":"Manu Bennett, Larenz Tate, Linden Ashby, Kevon Stover","Plot":"Champion gamer Max Troy discovers events in a new video game are being mirrored in the real world, and must join forces with the game's protagonist, Orson Creed, to unravel the conspiracy before the game's sinister plot overwhelms the city.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BODdlMjU0MDYtMWQ1NC00YjFjLTgxMDQtNDYxNTg2ZjJjZDFiXkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.7/10"},{"Source":"Rotten Tomatoes","Value":"22%"}],"Metascore":"N/A","imdbRating":"5.7","imdbVotes":"10,156","imdbID":"tt4244162","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}`)
        }

        return JSON.parse(`{"Search":[{"Title":"Beta Test","Year":"2016","imdbID":"tt4244162","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BODdlMjU0MDYtMWQ1NC00YjFjLTgxMDQtNDYxNTg2ZjJjZDFiXkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg"},{"Title":"Johnny Test","Year":"2005–2014","imdbID":"tt0454349","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BYzc3OGZjYWQtZGFkMy00YTNlLWE5NDYtMTRkNTNjODc2MjllXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"},{"Title":"The Test: A New Era for Australia's Team","Year":"2020–","imdbID":"tt11347692","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BNTNkMTg4YmEtNWViZS00NGMwLWIwYmItMGVmYjU1ZTY1ZGYyXkEyXkFqcGdeQXVyMzA5MTg1Mzc@._V1_SX300.jpg"},{"Title":"Test Pilot","Year":"1938","imdbID":"tt0030848","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjVjZmQyNzAtNTBiOC00MjNkLTk1NjktNGI1YmFmYjA0ODNmXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"},{"Title":"Test","Year":"2013","imdbID":"tt2407380","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTQwMDU5NDkxNF5BMl5BanBnXkFtZTcwMjk5OTk4OQ@@._V1_SX300.jpg"},{"Title":"The Test","Year":"2012","imdbID":"tt1986180","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNTgzMjM5M15BMl5BanBnXkFtZTcwNDUzMTE1OA@@._V1_SX300.jpg"},{"Title":"Baka and Test: Summon the Beasts","Year":"2010–","imdbID":"tt1655610","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BNThiMWI0ODktMzY5NC00YzE5LWIzMjUtYTUzYWNiYWUyZmE2XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg"},{"Title":"The Test Case","Year":"2017–","imdbID":"tt6868278","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BNjU1YmU2NzgtZTQ5NS00ZDQzLWI5MDMtM2VjOTQwZjg1YzY5XkEyXkFqcGdeQXVyODI2MzM0MTM@._V1_SX300.jpg"},{"Title":"The Test","Year":"2013","imdbID":"tt2616114","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjMzMDQwMzM2M15BMl5BanBnXkFtZTcwMzA1OTg1OQ@@._V1_SX300.jpg"},{"Title":"Rabbit Test","Year":"1978","imdbID":"tt0078133","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYmMyYzYxNmYtMGU4OC00MDFlLWJiYmQtZTJmNTMwZjg1ZTkwXkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_SX300.jpg"}],"totalResults":"719","Response":"True"}`)
    }

}

export { get }
