const mongodbCRUD = require('../../utils/mongodbCURD')
const model = 'peoples'

const PeopleController = {
    async findOne(query) {
        return await mongodbCRUD.findOne(model,query)
    }
}

console.log('..',PeopleController)
module.exports = PeopleController