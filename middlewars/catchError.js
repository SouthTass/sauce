const {httpException} = require('../core/httpException')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if(error instanceof httpException){
      ctx.status = error.status
      ctx.body = error.message
    }else{
      ctx.status = 500,
      ctx.body = '服务出错，请稍后重试'
    }
  }
}

module.exports = catchError