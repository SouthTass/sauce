const dayjs = require('dayjs')
const { Company } = require('../../models/micro/Company')
const Router = require('koa-router')
const router = new Router({
  prefix: '/micro'
})

router.post('/company/add', async (ctx, next) => {
  let body = ctx.request.body
  await Company.createItem(body)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

router.get(`/company/list`, async (ctx, next) => {
  let params = ctx.query
  let res = await Company.getList(params)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    list: res
  }
  return res
})

module.exports = router