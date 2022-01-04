const { PerformanceForecast } = require('../../models/stock/performance-forecast')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

router.post('/performance/forecast/first', async (ctx, next) => {
  let id = ctx.params.id
  let res = await PerformanceForecast.getFirst()
  if(res){
    ctx.body = res
  }else{
    ctx.body = {
      status: 1,
      message: '暂无数据'
    }
  }
})

router.post('/performance/forecast/add', async (ctx, next) => {
  let body = ctx.request.body
  console.log(1, body)
  if(!body.code) throw new global.customError.ServiceError('股票代码不能为空')
  if(!body.name) throw new global.customError.ServiceError('股票名称不能为空')
  if(!body.type) throw new global.customError.ServiceError('公告类型不能为空')
  if(!body.time) throw new global.customError.ServiceError('公告不能为空')
  if(!body.float) throw new global.customError.ServiceError('公告变动幅度不能为空')
  if(!body.profit) throw new global.customError.ServiceError('同期净利润不能为空')
  if(!body.content) throw new global.customError.ServiceError('公告摘要不能为空')
  let res = await PerformanceForecast.createItem(
    body.code, body.name, body.type, body.time, body.float, body.profit, body.content
  )
  if(!res) throw new global.customError.ServiceError('程序错误')
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

module.exports = router