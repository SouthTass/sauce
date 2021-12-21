const Router = require('koa-router')
const router = new Router()
const { User } = require('../../models/user')

router.post('/user/register', async (ctx, next) => {
  let body = ctx.request.body
  let email = await User.findOne({
    where: {
      email: body.email
    }
  })
  if(email){
    return ctx.body = {
      message: '该邮箱已被注册',
      status: 1
    }
  }
  let res = await User.create(body)
  if(res) throw new global.customError.Success('注册成功')
})

module.exports = router