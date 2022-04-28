// const { default: mongoDBCRUD } = require('../../utils/mongodbCURD')
const mongodbCRUD = require('../../utils/mongodbCURD')
const model = 'peoples'
const  AccountController = {
    async login(body) {
        let { account, password } = body
        let params = {
          ["profile.account"]: account,
          ["profile.password"]: password,
          deleted: false
        }
        let res = await mongodbCRUD.findOne("peoples", params)
        // 该账号不存在
        if (res == null) {
          return {code: 400, message: '账号或密码不正确'}
        } else {
          return {code: 200, message: '登录成功',result: res}
        }
    },

    async add(body) {
        console.log(body)
        return await mongodbCRUD.insertOne(model,body)
    },

    async findOne(query) {
        return await mongodbCRUD.findOne(model,query)
    }
}

module.exports = AccountController