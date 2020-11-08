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

/**
 *
 * @param url
 * @param data
 * @return Object
 * @throws InvalidUrlException
 * @throws Error
 */
const get = async (url = '', data = {}) => {
    validateUrl(url)

    url = buildUrl(url, data)

    return await request(url, 'GET')
}

export { get }
