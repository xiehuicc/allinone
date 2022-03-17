const ObjectId = require('mongodb').ObjectId
const constructObjectId = () => {
    return ObjectId().toString()
}

module.exports = constructObjectId