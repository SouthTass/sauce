const { StockTimePrice } = require('../../models/stock/time-price')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/stock/timeprice'
})

// 添加今日价格
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await StockTimePrice.addOneItem(body)
  if(res) ctx.body = res
})

// 查询今日价格
router.get('/find', async (ctx, next) => {
  let res = await StockTimePrice.getOneGroup(ctx.query)
  if(res) ctx.body = res
})


// 查询大盘同一时间交易数量
router.get('/allrpice', async (ctx, next) => {
  let res = await StockTimePrice.getOneItemInCurrentTime(ctx.query)
  if(res) ctx.body = res
})
module.exports = router