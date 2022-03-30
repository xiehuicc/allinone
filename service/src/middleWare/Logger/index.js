const log4js = require('log4js')
const logger = log4js.getLogger('卷王的开发日常')
logger.level = 'debug';
logger.trace('this is trace');
logger.debug('this is debug');  
logger.info('this is info');
logger.warn('this is warn');
logger.error('this is error');
logger.fatal('this is fatal');
// 日志拦截
// module.exports.intercept = function() {
//     console.log('22222222')
//     logger.debug("TIme",new Date())
// }

const intercept = ( options ) => {
    return async (ctx, next) => {
      const start = Date.now()
      log4js.configure({
        appenders: { koa2learn: { type: 'file', filename: './log/koa2learn.log' } },
        categories: { default: { appenders: ['koa2learn'], level: 'info' } }
      }); 
      const logger = log4js.getLogger('koa2learn');
      await next()
      const end = Date.now()
      const responseTime = end - start;
      logger.info(`响应时间为${responseTime/1000}s`);
    }
}

module.exports = {
    intercept
}