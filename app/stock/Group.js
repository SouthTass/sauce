const { Group } = require('../../models/stock/group')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/stock/group'
})

// 添加组合
router.post('/add', async (ctx, next) => {
  let body = ctx.request.body
  let res = await Group.addGroup(body)
  if(res) ctx.body = res
})

// 修改组合
router.put('/update', async (ctx, next) => {
  let body = ctx.request.body
  let res = await Group.updateGroup(body)
  if(res) ctx.body = res
})

// 查询本人的指定组合
router.get('/find', async (ctx, next) => {
  let res = await Group.getOneGroup(ctx.query)
  if(res) ctx.body = res
})

// 清除重复数据
router.get('/clear', async (ctx, next) => {
  let res = await Group.clearRepetitionGroup()
  if(res) ctx.body = res
})

module.exports = router