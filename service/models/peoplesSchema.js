const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createAndUpdate = require('./createAndUpdate')
const { constructObjectId } = require('../utils/ObjectId')

const peoplesSchema = new Schema({
    _id: {type: Schema.Types.String, default: constructObjectId},    // 人员id
    delete: {type: Schema.Types.Boolean, default: false}, //人员是否删除
    birthday: {type: Schema.Types.String,default: Schema.Types.Date}, // 出生日期
    ...createAndUpdate
})

module.exports =  mongoose.model('peoples', peoplesSchema);