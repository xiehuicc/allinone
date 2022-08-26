const yzjService = require('../services/yunzhijia')

class YzjController {
  async getAccessToken (params) {
    return await yzjService.getAccessToken(params)
  }
  async getAllPeople(params) {
    let result =  await yzjService.getAllPeople(params)
    if(result.success) {
      let peopleList = result.data
    }
    return result
  }
}

const yzjController= new YzjController()
module.exports = yzjController