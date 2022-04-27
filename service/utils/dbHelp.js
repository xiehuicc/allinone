// 对于新增人员方法，需要添加默认值（如创建时间，是否删除）需要用create方法。

var models = {};
(async function () {
  const fs = require('fs')
  const path = require('path')
  const files = await fs.readdirSync(path.join(__dirname, '../models'))
  files.forEach(file => {
    if (file.includes('Schema')) {
      const model = require(path.join(__dirname, `../models/${file}`))
      const [modelName] = file.split(/Schema/) // file为peoplesSchema.js  输出如 [ 'peoples' ]
    //   modelName == 'people' ? models['account'] = model : ''
      models[modelName] = model // 输出如 Model { peoples }
    }
  })

})();

// 简单的增删改查，复杂的操作单独写model的helper
//archdata的接口
exports.find = async (model, query, projection, populate = '', sort = { createTime: '-1' }, limit) => {
  if (limit) {
    return models[model].find(query, projection).populate(populate).sort(sort).limit(limit)
  }
  return models[model].find(query, projection).populate(populate).sort({ createTime: '-1' })
}

exports.aggregate = async (model, query, lookup, skip, limit, sort, group) => {
  return models[model].aggregate([
    { $match: query },
    { $lookup: lookup },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
    { $group: group }
  ])
}

/**
 * 聚合查询
 */
exports.aggregateQuery = async (model, query, lookup, unwind) => {
  if (query.page) {
    return exports.aggregatePageQuery(model, query, lookup, unwind)
  } else {
    return exports.aggregate2(model, query.params, lookup, unwind)
  }
}

/**
 * 聚合查询不分页
 */

exports.aggregate2 = async (model, params, lookup, unwind, sort = { _id: -1 }) => {
  return models[model].aggregate([
    // { $match: params },
    ...lookup,
    { $match: params },
    { $sort: sort },
    ...unwind,
  ])
}

/**
 * 分页聚合查询
 */
exports.aggregatePageQuery = async (model, query, lookup, unwind) => {

  const Model = models[model]
  var start = (query.page.pageIndex - 1) * query.page.pageSize
  const [group, result] = await Promise.all([

    // 查询数量
    Model.aggregate([
      //  { $match: query.currentMatch },
      ...lookup,
      { $match: query.params },
      //   { $match: query.lookupMatch },
      { $group: { _id: 1, count: { $sum: 1 } } }
    ]),
    Model.aggregate([
      //  { $match: query.currentMatch },
      ...lookup,
      { $match: query.params },
      ...unwind,
      // { $match: query.lookupMatch }, 
      //  { $project: query.projection },
      { $sort: query.page.sort },
      { $skip: start },
      { $limit: query.page.pageSize },

    ])
  ])
  const count = group && group[0] && group[0].count ? group[0].count : 0
  // const count = group && group.length
  return {
    pageSize: query.page.pageSize,
    pageNumber: query.page.pageIndex,
    pageCount: Math.ceil(count / query.page.pageSize),
    totalCount: count,
    results: result
  }
}

exports.aggregatePageCount = async (model, query, lookup, unwind) => {
  return Model.aggregate([
    { $match: query.params },
    // ...lookup,
    { $group: { _id: 1, count: { $sum: 1 } } }
  ])
}

// 简单的增删改查，复杂的操作单独写model的helper
exports.find2 = async (model, query, projection, populate = '') => {
  return models[model].find(query, projection).populate(populate).sort({ updateTime: '-1' })
}

//查找一条
exports.findOne = async (model, query, projection, populate = '') => {
  return models[model].findOne(query, projection).populate(populate)
}

//新增一条
exports.add = async (model, body) => {
  console.log(models,models[model])
  return models[model].create(body)
}

//聚合查询
exports.aggregate = async (model, query) => {
  return models[model].aggregate(query)
}

//新增多条
exports.insertMany = async (model, documents) => {
  return models[model].insertMany(documents)
}

//新增多条
exports.updateMany = async (model, query, documents) => {
  return models[model].updateMany(query, documents)
}

//更新
exports.update = async (model, filter, body) => {
  return models[model].update(filter, body)
}

//查找一条更新
exports.findOneAndUpdate = async (model, filter, body, options = { new: true }) => {
  return models[model].findOneAndUpdate(filter, body, options)
}

//删除
exports.delete = async (model, filter) => {
  return models[model].remove(filter)
}

//计数
exports.count = async (model, fields) => {
  return models[model].countDocuments(fields)
}
/**
 *
 * @param {*} model
 * @param {*} query {
 *   params: {},
 *   projection: {} 指定返回的键，不返回其他键, 1返回，0不返回
 *   page: {},
 *   populate: []
 * }
 */
//条件查询
exports.query = async (model, query) => {
  if (query.page) {
    return exports.pageQuery(model, query.params, query.page, query.populate, query.projection)
  } else {
    return exports.find2(model, query.params, query.projection, query.populate)
  }
}

/**
 *
 * @param {*} Model
 * @param {*} params
 * @param {*} page {
 *   @param {*} pageIndex: 1
 *   @param {*} pageSize: 10
 *   @param {*} sort
 * }
 * @param {*} populate
 */


//分页查询
exports.pageQuery = async (model, params, page = { pageSize: 20, pageIndex: 1, sort: '_id' }, populate = '', projection = {}) => {
  const Model = models[model]
  var start = (page.pageIndex - 1) * page.pageSize
  // let curr = Date.now()
  // console.log(`分页查询开始时间${curr}`)
  // const count = await Model.countDocuments(params)
  // console.log(`查询总数量花费时间${Date.now() - curr}`)
  // const records = await Model.find(params, projection)
  //   .skip(start)
  //   .limit(page.pageSize)
  //   .populate(populate)
  //   .sort(page.sort)
  //   console.log(`查询总数量所有数据花费时间${Date.now() - curr}`)
  const [count, records] = await Promise.all([
    // 查询数量
    Model.countDocuments(params),
    // 查询一页的记录
    Model.find(params, projection)
      .skip(start)
      .limit(page.pageSize)
      .populate(populate)
      .sort(page.sort)
  ])
  return {
    pageSize: page.pageSize,
    pageNumber: page.pageIndex,
    pageCount: Math.ceil(count / page.pageSize),
    totalCount: count,
    results: records
  }
}

