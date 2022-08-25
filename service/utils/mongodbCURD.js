const MongoClient = require('mongodb').MongoClient;
const config =  require('../config/config')
const people = require('../src/models/peoplesSchema')
const _ =  require('lodash')
const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
};
const option = { useNewUrlParser: true, useUnifiedTopology: true }
class MongoDBCRUD {
    /**
     * 构造函数创建客户端
     */
    constructor() {
        this.mongodb_url = config.mongodb_url
        this.transactionOptions = transactionOptions
        if (config.authSource) {
            option['authSource'] = config.authSource
        }
        new MongoClient(config.mongodb_url, option).connect((error, response) => {
            console.log(`connnect error------${error}`)
            if (!_.isEmpty(response)) {
                this.client = response
                this.client.on('error', (error, response) => {
                    console.log(`on error--------${error}`)
                })
            }
        })
    }
    /**
     * 条件查询数据
     * @param {*} model  collection名称
     * @param {*} params 查询的参数
     * @param {*} projection 要返回的字段
     */
    async find(model = '', params = {}, projection = {},) {
        try {
            const Model = await getModel(model)
            const result = await Model.find(params).project(projection).toArray()
            return result
        } catch (error) {
            //   this.client.close()//关闭数据库连接
            throw new global.BusinessError(500, error && error.message || '数据库查询数据失败')
        }
    }
    /**
     * 条件查询数据
     * @param {*} model  collection名称
     * @param {*} params 查询的参数
     * @param {*} projection 要返回的字段
     */
    async findOne(model = '', params = {}, projection = {},) {
        try {
            const Model = await getModel(model)
            const result = await Model.findOne(params, { projection: projection })
            return result
        } catch (error) {
            //   this.client.close()//关闭数据库连接
            throw new global.BusinessError(500, error && error.message || '数据库查询数据失败')
        }
    }

    /**
     * 分页条件查询
     * @param {*} model 
     * @param {*} params 
     * @param {*} page 
     * @param {*} projection 
     */
    async pageQuery(model = '', params = {}, page = { pageSize: 20, pageIndex: 1, sort: '_id' }, projection = {}) {
        try {
            // console.log('------------------')
            // console.log(page)
            // console.log(params)
            const Model = await getModel(model)
            const start = (page.pageIndex - 1) * page.pageSize
            const [count, records] = await Promise.all([
                // 查询数量
                Model.countDocuments(params),
                // 查询一页的记录
                Model.find(params)
                    .skip(start)
                    .limit(page.pageSize)
                    .sort(page.sort)
                    .project(projection)
                    .toArray()
            ])
            //  this.client.close()//关闭数据库连接
            return {
                pageSize: page.pageSize,
                pageNumber: page.pageIndex,
                pageCount: Math.ceil(count / page.pageSize),
                totalCount: count,
                results: records
            }
        } catch (error) {
            //  this.client.close()//关闭数据库连接
            throw new global.BusinessError(500, error && error.message || '数据库查询数据失败')

        }
    }
    /**
     * 查询数据
     * @param {*} model collection 的名称
     * @param {*} query 查询的所有条件
     */
    async query(model = '', query = {}, useFind = false) {
        if (query.page && !useFind) {
            return this.pageQuery(model, query.params, query.page, query.projection)
        } else {
            return this.find(model, query.params, query.projection)
        }
    }

    /**
     *  更新单条数据
     * @param {*} model collection 名称
     * @param {*} filter 过滤条件
     * @param {*} doc 要更新的字段及操作
     */
    async updateOne(model = '', filter, doc, option = {}) {
        const Model = await getModel(model)
        return await Model.updateOne(filter, doc, option)
    }

    /**
     *  更新多条数据
     * @param {*} model collection 名称
     * @param {*} filter 过滤条件
     * @param {*} doc 要更新的字段及操作
     */
    async updateMany(model = '', filter, doc, option = {}) {
        const Model = await getModel(model)
        return await Model.updateMany(filter, doc, option)
    }

    /**
     *  插入单条数据
     * @param {*} model 
     * @param {*} doc 
     */
    async insertOne(model = '', doc, option = {}) {
        const Model = await getModel(model)
        let res = await Model.insertOne(doc, option)
        return res
    }

    /**
     *  插入多条数据
     * @param {*} model 
     * @param {*} doc 
     */
    async insertMany(model = '', doc, option = {}) {
        const Model = await getModel(model)
        return await Model.insertMany(doc, option)
    }
    /**
     *  根据collection名称获取model
     * @param {*} name collection 的名称
     */
    async getModelbyName(name = '') {
        return getModel(name)
    }

    async findOneAndUpdate(model = '', filter, doc, option = {}) {
        const Model = await getModel(model)
        return await Model.findOneAndUpdate(filter, doc, option)
    }

    /**
      *  获取session
      * @param {*} option  开启session的option
     */
    getSession(option) {
        return mongoDBCRUD.client.startSession(option)
    }
}
const mongoDBCRUD = new MongoDBCRUD()

const getModel = async (model = '') => {
    try {
        const db = mongoDBCRUD.client.db(config.mongodb_db)
        const Model = db.collection(model)
        return Model
    } catch (error) {
        throw new global.BusinessError(500, error && error.message || '数据库查询数据失败')
    }
}
module.exports = mongoDBCRUD