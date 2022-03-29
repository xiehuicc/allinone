// const { default: mongoDBCRUD } = require('../../utils/mongodbCURD')
const mongoDBCRUD = require('../../utils/mongodbCURD')
const model = 'peoples'
const  AccountController = {
    async login(body) {
        let {accountName, password} = body
        let res = await mongoDBCRUD.findOne("peoples",{accountName:accountName,password:password})
        console.log(res,'///////')
        return res
    },

    async add(body) {
        console.log(body)
        return await mongoDBCRUD.insertOne(model,body)
    },

    async findOne(query) {
        return await mongoDBCRUD.findOne(model,query)
    }
}

module.exports = AccountController