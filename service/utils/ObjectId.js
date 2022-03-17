const ObjectId = require('mongodb').ObjectId
console.log('ddddd',ObjectId().toString())
const constructObjectId = () => {
    return ObjectId().toString()
}

module.exports = constructObjectId