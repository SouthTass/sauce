const Router = require('koa-router')
const router = new Router({
  prefix: '/book'
})

router.post('/:id/detail', async (ctx, next) => {
  let id = ctx.params.id
  const book = new Book(id)
  ctx.body = await book.getDetail()
})

module.exports = router