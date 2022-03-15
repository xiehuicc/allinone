const ObjectID = require('mongodb').ObjectID
console.log('ddddd',ObjectID)
const constructObjectId = () => {
    return ObjectID().toString()
}

module.exports = constructObjectId