const { IdleCapitalRecord } = require('../../models/stock/idle-capital-record')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

// 查找数据库中有无该消息
router.post('/idlecapital/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.name) throw new global.customError.ServiceError('股票名称不能为空')
  if(!body.tag) throw new global.customError.ServiceError('操作类型不能为空')
  if(!body.source) throw new global.customError.ServiceError('来源不能为空')
  if(!body.time) throw new global.customError.ServiceError('登记时间不能为空')
  let res = await IdleCapitalRecord.addRecord(body)
  if(res) ctx.body = res
})

module.exports = router