const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createAndUpdate = require('./createAndUpdate')
const { constructObjectId } = require('../../utils/ObjectId')

const peoplesSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, default: constructObjectId},    // 人员id
    deleted: {type: Schema.Types.Boolean, default: false}, //人员是否删除
    birthday: {type: Schema.Types.String,default: Schema.Types.Date}, // 出生日期
    profile:{
        name: {type: Schema.Types.String, required: true}, // 员工姓名，必填
        employeeNumber: {type: Schema.Types.String}, // 员工编号
        isInter: {type: Schema.Types.Boolean,default: true}, // 是否为内部人员，默认为true
        account: {type: Schema.Types.String }, // 员工账号
        password: {type: Schema.Types.String }, // 员工密码
        tel: {type: Schema.Types.String }, // 员工手机号
        photoUrl: {type: Schema.Types.String}, // 员工照片
        email: {type: Schema.Types.String}, // 邮箱
        job: {type: Schema.Types.String}, // 岗位
        gender: {type: Schema.Types.String}, // 性别
    },
    organization: {
        _id: {type: Schema.Types.ObjectId,default: constructObjectId},
        parentOrganizationId: {type: Schema.Types.String}, // 上级部门id
        organizationId: {type: Schema.Types.String}, // 本部门Id
        organizationName: {type: Schema.Types.String} // 该部门名称
    },
    ...createAndUpdate
})

module.exports =  mongoose.model('peoples', peoplesSchema);