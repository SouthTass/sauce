const { StockList } = require('../../models/stock/stock-list')
const Router = require('koa-router')
const router = new Router({
  prefix: '/stock'
})

router.post('/list/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await StockList.addList(body)
  if(res){
    ctx.body = res
  }else{
    ctx.body = {
      status: 1,
      message: '暂无数据'
    }
  }
})

module.exports = router