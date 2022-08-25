const mongodbCRUD = require('../../utils/mongodbCURD')
const dbHelper = require('../../utils/dbHelp')
const { context } = require('../../app')
const model = 'peoples'



const PeopleController = {
    async findOne(query) {
        if (query.deleted) {
          // 将字符串 转为布尔值
          query.deleted =  eval(query.deleted)
        }
        return await mongodbCRUD.findOne(model,query)
    },

    async find(params) {
        return await mongodbCRUD.find(model,params)
    },

    async add(body,ctx) {
        let identities = await this.transformField(body)
        if(identities.profile) {
            var {account,tel} = identities.profile
        } else {
            throw new global.BusinessError(500,'请先输入人员信息')
        }
        // 账号或手机号重复时 不能新增
        if(account) {
            let res = await mongodbCRUD.findOne(model,{["profile.account"]: account})
            if(res) {
                // throw new global.BusinessError(500,'该账号已存在')
                ctx.throw(500,'该账号已存在')
            }
        }
        if(tel) {
            let res = await mongodbCRUD.findOne(model,{["profile.tel"]: tel})
            if(res) {
                // throw new global.BusinessError(500,'该手机号已存在')
                ctx.throw(500,'该手机号已存在')
            }
        }
        let res = await dbHelper.add(model,identities)
        return {code: 200,result: res}
    },
    async pageQuery(params) {
        let res = await mongodbCRUD.pageQuery(model,params)
        return {code: 200,result: res}
    },
   
    // 转换 对应数据库中查询的字段
    async transformField(body) {
        let identities= {
            profile : {}
        }
        const {employeeNumber,birthday,name, account,password,tel} = body
        identities.birthday = birthday || ''
        identities.profile.name = name
        identities.profile.employeeNumber = employeeNumber || ''
        identities.profile.account = account
        identities.profile.password = password
        identities.profile.tel = tel
        return identities
    },
}

module.exports = PeopleController