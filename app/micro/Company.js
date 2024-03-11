const dayjs = require('dayjs')
const { Company } = require('../../models/micro/Company')
const Router = require('koa-router')
const router = new Router({
  prefix: '/micro'
})

router.post('/company/add', async (ctx, next) => {
  let body = ctx.request.body
  await Company.saveBall(body)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

// router.get(`/powerball/list`, async (ctx, next) => {
//   let params = ctx.query
//   if(!params.type) throw new global.customError.ServiceError('彩票类型不能为空')
//   let res = await Powerball.getBallList(params)
//   ctx.status = 200
//   ctx.body = {
//     message: 'ok',
//     list: res
//   }
//   return res
// })

module.exports = router