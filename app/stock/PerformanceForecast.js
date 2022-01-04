const { PerformanceForecast } = require('../../models/stock/performance-forecast')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

router.post('/performance/forecast/first', async (ctx, next) => {
  let id = ctx.params.id
  let res = await PerformanceForecast.getFirst()
  if(res){
    ctx.body = {
      code: res.code,
      time: res.time
    }
  }
})

router.post('/performance/forecast/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.code) throw new global.customError.ServiceError('股票代码不能为空')
  if(!body.name) throw new global.customError.ServiceError('股票名称不能为空')
  if(!body.type) throw new global.customError.ServiceError('公告类型不能为空')
  if(!body.time) throw new global.customError.ServiceError('公告不能为空')
  if(!body.float) throw new global.customError.ServiceError('公告变动幅度不能为空')
  if(!body.profit) throw new global.customError.ServiceError('同期净利润不能为空')
  if(!body.content) throw new global.customError.ServiceError('公告摘要不能为空')
  let res = await PerformanceForecast.createItem('341243')
  if(!res) throw new global.customError.ServiceError('程序错误')
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

module.exports = router