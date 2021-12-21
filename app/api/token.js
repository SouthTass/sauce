const Router = require('koa-router')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/token'
})
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewars/auth')
const { WXManager } = require('../../services/wx')

router.post('/', async (ctx, next) => {
  let body = ctx.request.body
  const res = await WXManager.codeToToken(body.code)
  ctx.body = {
    token: res
  }
})

router.post('/check', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.token) throw new global.customError.AuthFailed('token不能为空')
  const res = Auth.checkToken(body.token)
  if(res){
    throw new global.customError.Success('token有效')
  }else{
    throw new global.customError.Success('token已过期')
  }
})

async function emaillLogin(account, secret){
  const user = await User.verifyEmailPassword(account, secret)
  return token = generateToken(user.id, Auth.USER)
}

module.exports = router