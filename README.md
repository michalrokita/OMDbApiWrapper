#OMDbApiWrapper
A small wrapper around omdbapi.com RESTful API.

## Installation (NPM)
```
npm i omdb-async-api-wrapper
```

## Installation (Downloading from Github)
If you don't want to use Npm to manage your packages you can also copy minified source code of the library
from the */build* folder directly from Github. Alternatively, you can clone the entire repository and build the
project yourself.

In order to build the project locally, run `npm build:prod` in the terminal.

## Documentation

### Setup
In order to use the library, import it as a module or use the self-registering global instance.
If you decide to import, you need to create a new instance of the library and pass your api key as a
parameter to the constructor. Alternatively, when using a global instance, you will need to set an api key
with a setter `OmdbApiWrapper.setApiKey(__apiKey__)`
```js
import OmdbApiWrapper from 'omdb-async-api-wrapper'

const wrapperInstance = new OmdbApiWrapper(__apiKey__)
```

### Fetching item's data by **IMDb ID** or **Title**
You can fetch a movie by ID or title. In both cases, the method returns a promise that resolves
with an object containing movie's data. If API returns an error, exception will be thrown.
```js
const movie = await wrapperInstance.findById(__imdbID__)
const movie2 = await wrapperInstance.findByTitle(__title__)
```

### Searching by Title
If you want to search by a movie's name, you can do so by utilizing *searchByTitle* method. If the
search resolves correctly, *MovieSearchCollection* will be returned. The instance of the latter, allows
not only to retrieve the data from the first results' page but also paginate the results. It utilizes the 
API's *page* param in order to make pagination a breeze.
```js
const movieSearchCollection = await wrapperInstance.searchByTitle(__title__)
const currentPageResults = movieSearchCollection.results()

movieSearchCollection.nextPage()
const nextPageResults = movieSearchCollection.results()

movieSearchCollection.prevPage()
const prevPageResults = movieSearchCollection.results()

movieSearchCollection.page(20)
const twentiethPageResults = movieSearchCollection.results()

```

### Filters
While searching, you can also use filters. Available filters are: item's type, and a year of the release.
```js
wrapperInstance.setSearchedType('movie') // movie|series|episode
wrapperInstance.setReleaseYear(1999)
```
In order to reset the filters:
```js
wrapperInstance.resetFilters()
```

### Other search variables
When fetching specific movie/series you can decide if you want to get the shortened version of the
plot or the whole thing.
```js
wrapperInstance.setPlotType('short') // short|full
```
