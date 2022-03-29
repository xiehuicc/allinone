
class BusinessError extends Error {
    constructor(code = 201, msg = '未定义错误') {
      super(msg)
      this.code = code
      this.msg = msg
    }
  }
  
module.exports = BusinessError