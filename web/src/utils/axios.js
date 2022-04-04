import axios from 'axios'
import config from '../../static/config'
axios.defaults.baseURL = config.baseUrl

export default {
  setAxiosGetPromise: (url, params) => params ? axios.get(url, { params: params }) : axios.get(url),
  setAxiosPostPromise: (url, data) => data ? axios.post(url, data) : axios.post(url),
  setAxiosPutPromise: (url, data) => data ? axios.put(url, data) : axios.put(url),
  setAxiosDeletePromise: (url, params) => params ? axios.delete(url, { params: params }) : axios.delete(url)
}