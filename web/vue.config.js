module.exports = {
    lintOnSave: false,
    devServer: {
      overlay: {
        warning: false,
        errors: false
      },
      open: true,
      host: 'localhost',
      port: 8080,
      https: false,
      //以上的ip和端口是我们本机的;下面为需要跨域的
      proxy: { //配置跨域
        '/allinone': {
          target: 'http://localhost:3000', //后端给的测试服务器地址
          // target: 'http://47.103.142.69:3000', //  这个是上线时线上的服务器地址
          ws: true,
          changOrigin: true, //允许跨域
        //   pathRewrite: {
        //     '^/api': '' //请求的时候使用这个api就可以
        //   }
        }
      }
    },
    // chainWebpack: config => {
    //   config.plugin('html')
    //     .tap(args => {
    //     //   args[0].title = "海行后台";
    //       return args;
    //     })
    // }
  
  }
  