const { StockBoardLadder } = require('../../models/stock/board-ladder')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock/board-ladder'
})

// 添加条目
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await StockBoardLadder.addOneItem(body)
  if(res) ctx.body = res
})

// 查询条目
router.get('/list', async (ctx, next) => {
  let res = await StockBoardLadder.getList(ctx.query)
  if(res) ctx.body = res
})

module.exports = router