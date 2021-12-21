const {httpException} = require('../core/httpException')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if(error instanceof httpException){
      ctx.status = error.status
      ctx.body = {
        message: error.message,
        code: error.code
      }
    }else{
      ctx.status = 500
    }
  }
}

module.exports = catchError