// const { default: mongoDBCRUD } = require('../../utils/mongodbCURD')
const mongodbCRUD = require('../../utils/mongodbCURD')
const model = 'peoples'
const  AccountController = {
    async login(body) {
        let {accountName, password} = body
        let res = await mongodbCRUD.findOne("peoples",{accountName:accountName,password:password})
        return res
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