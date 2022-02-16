const { StockNewsList } = require('../../models/stock/stock-news-list')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

// 查找数据库中有无该消息
router.get('/newslist/findone', async (ctx, next) => {
  let res = await StockNewsList.getItemInfo(ctx.query.nid)
  if(res) ctx.body = res
})

// 查找数据库中有无该消息
router.get('/newslist/findone', async (ctx, next) => {
  let res = await StockNewsList.getLastItem()
  if(res) ctx.body = res
})

// 数据库中添加消息
router.post('/newslist/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await StockNewsList.addList(body)
  if(res) ctx.body = res
})

module.exports = router