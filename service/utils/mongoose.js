const mongoose = require('mongoose');
const config = require('../config/config');
let mongoClinet = null
class DB {
    constructor () {
        this.conn = null;
    }
    async connect() {
        let db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open',() => {
            console.log(`open db connection on ${config.mongodb_url}`)
        })
        // const option = {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        //   dbName: config.mongodb_db
        // }
        // this.conn = mongoose.connect(config.mongodb_url, option)
        // mongoClinet = this.conn
        mongoClinet = mongoose.connect(config.mongodb_url);
    }
}
const db = new DB()
module.exports = {
    db,
    mongoClinet
}