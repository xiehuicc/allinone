const axios = require('axios')
const config = require('../config/yzj')

class YzjService {
  constructor(config) {
    let result =   this.getAccessToken()
    this.token = result.access_token
  }
  async getAccessToken(params = {}) {
    const timestamp = new Date().getTime()
    params.eid = config.eid
    params.secret = config.secret
    params.scope = config.scope
    params.timestamp = timestamp
    let res = await axios.post(`${config.url}/gateway/oauth2/token/getAccessToken`,params)
    return res.data
    // return await axios.post(`${config.url}/gateway/oauth2/token/getAccessToken`,params) // 直接return会导致TypeError: Converting circular structure to JSON
  }

  async getAllPeople(params = {}) {
    params.eid = config.eid
    // params.data = {
    //   begin: 0,
    //   count: 1000,
    // }
    let result = await this.getAccessToken()
    let token = result.data.accessToken
    let res = await axios({
      method: 'post',
      url: `${config.url}/gateway/openimport/open/person/getall?accessToken=${token}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: params
    })
    return res.data
  }

}


const yzjService = new YzjService()
module.exports = yzjService
