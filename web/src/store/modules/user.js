import service from '../../services/index'

const state = {}

const actions = {
  async login ({ commit }, data)  { 
    return service.user_login(data)
  }
}

const mutations = {

}

export default {
  state,
  actions,
  mutations
}