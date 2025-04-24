const { FuturesGroup } = require('../../models/stock/futures-group')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/stock/futures-group'
})

// 添加
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await FuturesGroup.createItem(body)
  if(res) ctx.body = res
})

// 修改
router.post('/update', async (ctx, next) => {
  let body = ctx.request.body
  let res = await FuturesGroup.updateItem(body)
  if(res) ctx.body = res
})

// 查询
router.get('/find', async (ctx, next) => {
  let res = await FuturesGroup.getItem(ctx.query)
  if(res) ctx.body = res
})

module.exports = router