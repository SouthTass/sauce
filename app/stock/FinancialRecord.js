const { FinancialRecord } = require('../../models/stock/financial-record')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

/**
 * 查询盈亏统计
 */
router.get('/financial/record/stat', async (ctx, next) => {
  let query = ctx.query
  let res
  if(!Object.keys(query).length){
    res = await FinancialRecord.getStat()
  }
  if(ctx.query.type == 'profit'){
    res = await FinancialRecord.getProfitList('profit')
  }
  if(ctx.query.type == 'loss'){
    res = await FinancialRecord.getProfitList('loss')
  }
  if(res) return ctx.body = res
})

/**
 * 查询个股盈亏统计
 */
router.get('/financial/record/item', async (ctx, next) => {
  let query = ctx.query
  if(!query.code && !query.name) throw new global.customError.ServiceError('股票代码或名称不能为空')
  let res = await FinancialRecord.getItemStat(query.code || '', query.name || '')
  if(res) return ctx.body = res
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

module.exports = router