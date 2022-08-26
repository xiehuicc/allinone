const mongodbCRUD = require('../../utils/mongodbCURD')
const dbHelper = require('../../utils/dbHelp')
const { context } = require('../../app')
const ObjectId = require('mongodb').ObjectId;
const yzjController = require('../thirdpart/controllers/yzjController')
const defaultPassword  = '111111'
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
        let identities
        if(body.profile) {
            identities = body
        } else {
            identities = await this.transformField(body)
        }
        if(identities.profile) {
            var {account,tel} = identities.profile
        } else {
            throw new global.BusinessError(500,'请先输入人员信息')
        }
        // 账号或手机号重复时 不能新增
        if(account) {
            let res = await mongodbCRUD.findOne(model,{["profile.account"]: account})
            if(res) {
                throw new global.BusinessError(500,`${account}该账号已存在`)
                // ctx.throw(500,'该账号已存在')
            }
        }
        if(tel) {
            let res = await mongodbCRUD.findOne(model,{["profile.tel"]: tel})
            if(res) {
                throw new global.BusinessError(500,`${tel}该手机号已存在`)
                // ctx.throw(500,'该手机号已存在')
            }
        }
        await dbHelper.add(model,identities)
        return {code: 200,result: true}
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
    // 同步人员
    async pullPeople(body) {
        let result = await yzjController.getAllPeople()
        let pullPeopleList = result.data
        for (let i = 0; i < pullPeopleList.length; i++) {
            try {
                let people = this.changeFiled(pullPeopleList[i])
                let findRes = await this.findOne({_id: ObjectId(people._id)})
                if(findRes) {
                    
                } else {
                    await this.add(people)
                }
            } catch (error) {
                console.log(error)
            }
        }
        return {success: true}
    },
    //三方中的人员与数据库中人员字段转换 
    changeFiled(user) {
        let people = {
            _id: user.openId,
            birthday: user.birthday,
            profile: {
                name: user.name,
                employeeNumber: user.uid,
                account: user.phone,
                password: defaultPassword,
                tel: user.phone,
                photoUrl: user.photoUrl,
                email: user.email,
                job: user.jobTitle,
                gender: user.gender
            },
            organization: {
                parentOrganizationId: '',
                organizationId:  user.orgId,
                organizationName: user.department
            }
        }
        return people
    }
}

module.exports = PeopleController