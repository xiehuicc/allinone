
class BusinessError extends Error {
    constructor(code = 300, msg = '未定义错误') {
      super(msg)
      this.code = code
      this.msg = msg
    }
  }
  
module.exports = BusinessError