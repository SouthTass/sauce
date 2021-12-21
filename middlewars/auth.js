const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor(level){
    this.level = level || 1
    Auth.USER = 0
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN
  }
  get m(){
    return async (ctx, next) => {
      let errmsg = 'token不合法'
      let decode
      if(this.level == 10086) return await next()
      const userToken = basicAuth(ctx.req)
      if(!userToken || !userToken.name){
        throw new global.customError.Forbbiden()
      }
      try{
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      }catch(error){
        if(error.name == 'TokenExpiredError'){
          errmsg = 'token已过期'
        }else{

        }
        throw new global.customError.Forbbiden(errmsg)
      }
      if(decode.scope < this.level){
        this.errmsg = '权限不足'
        throw new global.customError.Forbbiden(errmsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
  static checkToken (token){
    try{
      jwt.verify(token, global.config.security.secretKey)
      return true
    }catch(err){
      return false
    }
  }
}

module.exports = {
  Auth
}