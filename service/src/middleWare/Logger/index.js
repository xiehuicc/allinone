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
    // 将日志文件保存到文件中
    //   log4js.configure({
    //     appenders: { koa2learn: { type: 'file', filename: './log/koa2learn.log' } },
    //     categories: { default: { appenders: ['koa2learn'], level: 'info' } }
    //   }); 
    
        const url = ctx.request.url
        logger.info(`${url}`)
        if(ctx.request.method === 'GET' || ctx.request.method === 'DELETE') {
            logger.info(`ctx.request.query：${JSON.stringify(ctx.request.query)}`)
        } else {
            logger.info(`ctx.request.body：${JSON.stringify(ctx.request.body || '')}`)
        }
        // 将日志信息 输出到控制台
        log4js.configure({
            appenders: { 'out': { type: 'stdout' } },
            categories: { default: { appenders: ['out'], level: 'info' } }
        });
        await next()
        const end = Date.now()
        const responseTime = end - start;
        logger.info(`响应时间为${responseTime/1000}s`);
    }
}

module.exports = {
    intercept
}