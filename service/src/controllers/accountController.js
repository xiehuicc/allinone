const { default: mongoDBCRUD } = require('../../utils/mongodbCURD')
const MongoDBCRUD = require('../../utils/mongodbCURD')

class AccountController {
    async login(body) {
        let {accountName, password} = body
        let res = await mongoDBCRUD.findOne("peoples",{accountName:accountName,password:password})
        console.log(res,'///////')
    }

    async add(body) {
        await mongoDBCRUD.insertOne('peoples',body)
    }
}

module.exports = AccountController