const mongodbCRUD = require('../../utils/mongodbCURD')
const model = 'peoples'



const PeopleController = {
    async findOne(query) {
        return await mongodbCRUD.findOne(model,query)
    },

    async add(body) {
        // let fields = await this.transformField(body)
        const profile = {}
        if(body.profile) {
            var {account,tel} = body.profile
        } else {
            throw new global.BusinessError(500,'请先输入人员信息')
        }
        // 账号或手机号重复时 不能新增
        if(account) {
            let res = await mongodbCRUD.findOne(model,{["profile.account"]: account})
            if(res) {
                throw new global.BusinessError(500,'该账号已存在')
            }
        }
        if(tel) {
            let res = await mongodbCRUD.findOne(model,{["profile.tel"]: tel})
            if(res) {
                throw new global.BusinessError(500,'该手机号已存在')
            }
        }
        return await mongodbCRUD.insertOne(model,body)
    },

    // 转换 对应数据库中查询的字段
    async transformField(body) {
        if(body.profile) {
            let identities = {
                profile: {}
            }
            const {name, account,password,tel} = body.profile
            if(name) identities.profile.name = name
            if(account) identities.profile.account = account
            if(password) identities.profile.password = password
            if(tel) identities.profile.tel = tel
            return identities
        }
    },
}

module.exports = PeopleController