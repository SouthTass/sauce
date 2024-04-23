const { IdleCapitalRecord } = require('../../models/stock/idle-capital-record')
const Router = require('koa-router')
const dayjs = require('dayjs')
const router = new Router({
  prefix: '/api/stock/idlecapital'
})

// 查找数据库中有无该消息
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.name) throw new global.customError.ServiceError('股票名称不能为空')
  if(!body.tag) throw new global.customError.ServiceError('操作类型不能为空')
  if(!body.source) throw new global.customError.ServiceError('来源不能为空')
  if(!body.time) throw new global.customError.ServiceError('登记时间不能为空')
  let res = await IdleCapitalRecord.addRecord(body)
  if(res) ctx.body = res
})

// 查询指定日期的游资买入情况，如果没有填写日期，则默认是今天
router.get('/buy', async (ctx, next) => {
  let time = ctx.query.time || dayjs().format('YYYY-MM-DD')
  let res = await IdleCapitalRecord.getBuyList(time)
  if(res.length < 1) throw new global.customError.EmptyData()
  ctx.body = res
})

module.exports = router