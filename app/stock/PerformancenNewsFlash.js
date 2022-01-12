const { PerformancenNewsFlash } = require('../../models/stock/performancen-news-flash')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

router.get('/performance/newsflash/first', async (ctx, next) => {
  let res = await PerformancenNewsFlash.getFirst()
  if(res){
    ctx.body = res
  }else{
    ctx.body = {
      status: 1,
      message: '暂无数据'
    }
  }
})

router.post('/performance/newsflash/add', async (ctx, next) => {
  let body = ctx.request.body
  console.log(1, body)
  if(!body.code) throw new global.customError.ServiceError('股票代码不能为空')
  if(!body.name) throw new global.customError.ServiceError('股票名称不能为空')
  if(!body.time) throw new global.customError.ServiceError('公告不能为空')
  if(!body.income) throw new global.customError.ServiceError('营业收入不能为空')
  if(!body.yesteryear_income) throw new global.customError.ServiceError('营业收入去年同期不能为空')
  if(!body.rate_income) throw new global.customError.ServiceError('营业收入环比增长不能为空')
  if(!body.chain_income) throw new global.customError.ServiceError('营业收入季度环比增长不能为空')
  if(!body.profit) throw new global.customError.ServiceError('净利润不能为空')
  if(!body.yesteryear_profit) throw new global.customError.ServiceError('去年同期净利润不能为空')
  if(!body.rate_profit) throw new global.customError.ServiceError('净利润同比增长不能为空')
  if(!body.chain_profit) throw new global.customError.ServiceError('净利润季度环比增长不能为空')
  if(!body.earnings) throw new global.customError.ServiceError('每股收益不能为空')
  if(!body.property) throw new global.customError.ServiceError('每股净资产不能为空')
  if(!body.yield_rate) throw new global.customError.ServiceError('净资产收益率不能为空')
  let res = await PerformancenNewsFlash.createItem(
    body.code, body.name, body.time, body.income, body.yesteryear_income, body.rate_income, body.chain_income,
    body.profit, body.yesteryear_profit, body.rate_profit, body.chain_profit, body.earnings, body.property, body.yield_rate
  )
  if(!res) throw new global.customError.ServiceError('程序错误')
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

module.exports = router