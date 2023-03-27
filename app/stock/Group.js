const { Group } = require('../../models/stock/group')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock/group'
})

// 添加组合
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await Group.addGroup(body)
  if(res) ctx.body = res
})

// 查询本人的指定组合
router.get('/find', async (ctx, next) => {
  if(!ctx.query.code) throw new global.customError.ServiceError('股票代码不能为空')
  if(!ctx.query.type) throw new global.customError.ServiceError('查询类型不能为空')
  let res = await Group.getRecord(ctx.query.code, ctx.query.type)
  if(res) ctx.body = res
})

module.exports = router