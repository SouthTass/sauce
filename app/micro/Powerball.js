const dayjs = require('dayjs')
const { Powerball } = require('../../models/micro/Powerball')
const Router = require('koa-router')
const router = new Router({
  prefix: '/micro'
})

router.post('/powerball/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.type) throw new global.customError.ServiceError('彩票类型不能为空')
  if(!body.code) throw new global.customError.ServiceError('彩票期数不能为空')
  await Powerball.saveBall(body)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

router.get(`/powerball/list`, async (ctx, next) => {
  let params = ctx.query
  if(!params.type) throw new global.customError.ServiceError('彩票类型不能为空')
  let res = await Powerball.getBallList(params)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    list: res
  }
  return res
})

// 获取双色球匹配度
router.get(`/powerball/ssq`, async (ctx, next) => {
  let params = ctx.query
  if(!params.type) throw new global.customError.ServiceError('彩票类型不能为空')
  if(!params.number) throw new global.customError.ServiceError('彩票号码不能为空')
  let arr = ''
  try {
    arr = params.number.split(' ')
  } catch (error) {
    throw new global.customError.ServiceError('彩票号码有误')
  }
  if(arr.length != 7) throw new global.customError.ServiceError('彩票号码有误')
  let res = await Powerball.getBallList(params)
  if(!res) throw new global.customError.ServiceError('服务有误，请稍后再试')
  res.data.list.map(e => {
    
  })
})

module.exports = router