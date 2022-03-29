const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createAndUpdate = require('./createAndUpdate')
const { constructObjectId } = require('../utils/ObjectId')

const peoplesSchema = new Schema({
    _id: {type: Schema.Types.String, default: constructObjectId},    // 人员id
    delete: {type: Schema.Types.Boolean, default: false}, //人员是否删除
    birthday: {type: Schema.Types.String,default: Schema.Types.Date}, // 出生日期
    profile:{
        name: {type: Schema.Types.String, required: true}, // 员工姓名，必填
        isInter: {type: Schema.Types.Boolean,default: true}, // 是否为内部人员，默认为true
        account: {type: Schema.Types.String }, // 员工账号
        password: {type: Schema.Types.String }, // 员工密码
    },
    ...createAndUpdate
})

module.exports =  mongoose.model('peoples', peoplesSchema);