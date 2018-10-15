import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getMovies () {
    return this.execute('get', '/movie')
  },
  createTrack (data) {
    return this.execute('post', '/track', data)
  },
  getTracks () {
    return this.execute('get', `/track`)
  },
  getSongs () {
    return this.execute('get', `/song`)
  },
  getLicensings () {
    return this.execute('get', `/licensing`)
  },
  createLicensing (data) {
    return this.execute('post', '/licensing', data)
  }
}
