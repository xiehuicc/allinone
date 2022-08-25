const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createAndUpdate = {
    updateIdentity: { type: Schema.Types.String }, // 更新人身份id
    createIdentity: { type: Schema.Types.String }, // 创建人身份id
    updateAccount: { type: Schema.Types.String }, // 更新人id
    createAccount: { type: Schema.Types.String }, // 创建人id
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
}

module.exports = createAndUpdate