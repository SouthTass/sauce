const { FinancialRecord } = require('../../models/stock/financial-record')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

// // 查找数据库中有无该消息
// router.get('/newslist/findone', async (ctx, next) => {
//   let res = await FinancialRecord.getItemInfo(ctx.query.nid)
//   if(res) ctx.body = res
// })

/**
 * 查询盈亏统计
 */
router.get('/financial/record/stat', async (ctx, next) => {
  let res = await FinancialRecord.getStat()
  if(res) ctx.body = res
})

/**
 * 添加清仓情况
 * @param {string} code               必填，股票代码
 * @param {string} name               必填，股票名称
 * @param {string} profit             必填，本次盈利
 * @param {string} sell_price         必填，清仓价格
 */
router.post('/financial/record/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.code) throw new global.customError.ServiceError('股票代码不能为空')
  if(!body.name) throw new global.customError.ServiceError('股票名称不能为空')
  if(!body.profit) throw new global.customError.ServiceError('本次盈利不能为空')
  if(!body.sell_price) throw new global.customError.ServiceError('清仓价格不能为空')
  let res = await FinancialRecord.addItem(body)
  if(res) ctx.body = res
})

// // 修改信息状态
// router.post('/financial/record/add', async (ctx, next) => {
//   let body = ctx.request.body
//   let res = await FinancialRecord.updateItem(body.nid)
//   if(res) ctx.body = res
// })

module.exports = router