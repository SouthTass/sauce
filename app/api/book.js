const Router = require('koa-router')
const router = new Router({
  prefix: '/book'
})
const { HotBook } = require('../../models/hot-list')
const { Book } = require('../../models/book')

router.get('/hotlist', async (ctx, next) => {
  const res = await HotBook.getAll()
  ctx.body = res
})

router.get('/:id/detail', async (ctx, next) => {
  let id = ctx.params.id
  const book = new Book(id)
  ctx.body = await book.getDetail()
})

module.exports = router