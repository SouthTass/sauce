const { PerformanceForeshow } = require('../../models/stock/performance-foreshow')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock/performance/foreshow'
})

// 数据库中添加消息
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await PerformanceForeshow.addRecord(body)
  if(res) ctx.body = res
})

// 查询指定的消息
router.get('/find', async (ctx, next) => {
  // if(!ctx.query.code) throw new global.customError.ServiceError('股票代码不能为空')
  // if(!ctx.query.type) throw new global.customError.ServiceError('查询类型不能为空')
  let res = await PerformanceForeshow.getRecord(ctx.query)
  if(res) ctx.body = res
})

// 查询指定的消息
router.get('/status', async (ctx, next) => {
  let res = await PerformanceForeshow.getRecordStatus(ctx.query)
  if(res) ctx.body = res
})

// 查询指定的消息
router.get('/list', async (ctx, next) => {
  let res = await PerformanceForeshow.getRecordStatus(ctx.query)
  if(res) ctx.body = res
})

// 修改信息状态
router.post('/update', async (ctx, next) => {
  let body = ctx.request.body
  let res = await PerformanceForeshow.updateRecords(body.code, body.type)
  if(res) ctx.body = res
})

module.exports = router