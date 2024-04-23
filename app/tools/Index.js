const dayjs = require('dayjs')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/tools'
})

// 获取服务器当前时间
router.get('/time/now', async (ctx, next) => {
  ctx.status = 200
  ctx.body = dayjs().format('YYYY-MM-DD HH:mm:ss')
})

module.exports = router