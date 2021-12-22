const Router = require('koa-router')
const router = new Router({
  prefix: '/book'
})

const { AccessTokenManager } = require('../../services/accessToken')

router.post('/:id/detail', async (ctx, next) => {
  let id = ctx.params.id
  const book = new Book(id)
  ctx.body = await book.getDetail()
})

router.get('/test', async (ctx, next) => {
  let res = await AccessTokenManager.getTokenFromWx()
  ctx.body = res
})


module.exports = router