const axios = require ('axios')
import { Notify } from 'notiflix/build/notiflix-notify-aio'

export default class apiFetch {
    constructor() {
        this.searchQuery = ''
        this.page = 1
        this.totalPages = null
    }


async fetchApi () {
    const API_KEY = '30103924-a4773e2d607068596576fe7b3'
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    const response = await axios.get (url)
    const data = await response.data
    const photo = await this.arrayPhoto(data)
    return photo
}

    arrayPhoto (r) {
        this.totalPages = Math.ceil (r.totalHits / 40)
            if (r.totalHits === 0) {
                return Notify.failure (`Sorry, there are no images matching your search query. Please try again.`)
            } 
            if (this.page === 1) {
             Notify.success (`Hooray! We found ${r.totalHits} images.`)
            }
        this.page += 1
        return r.hits
    }

    resetPage () {
        this.page = 1
        this.totalPages = null
    }

    get query () {
        return this.searchQuery
    }
    set query (newQuery) {
        this.searchQuery = newQuery
    }
}
