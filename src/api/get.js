import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_TOKEN
const VERSION = import.meta.env.VITE_API_VERSION

axios.defaults.baseURL = `${baseUrl}/${VERSION}`
axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

export default {
  getPopular: (type = 'movie') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/${type}/popular`
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  },
  getNowPlaying: () => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: '/movie/now_playing'
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  },
  getTrending: (time = 'day') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/trending/all/${time}`
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  },
  getGenre: (type) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/genre/${type}/list`
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  },
  getDetailMovie: (id, media = 'movie') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/${media}/${id}?append_to_response=videos&language=en-US`,
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  },
  getSearch: (title) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/search/movie?query=${title}&language=en-US&page=1`,
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  },
  getByGenre: (type, genreId) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/discover/${type}?with_genres=${genreId}`
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  },
  getTopRatedByType: (type) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `/${type}/top_rated`
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  }
}