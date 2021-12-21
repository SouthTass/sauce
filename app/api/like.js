const Router = require('koa-router')
const router = new Router({
  prefix: '/like'
})

const { Auth } = require('../../middlewars/auth')
const { Favor } = require('../../models/favor')

router.post('/', new Auth(10086).m, async(ctx, next) => {
  const body = ctx.request.body
  const res = await Favor.like(body.art_id, body.type, body.uid)
  ctx.body = res
})

router.post('/dis', new Auth(10086).m, async(ctx, next) => {
  const body = ctx.request.body
  const res = await Favor.dislike(body.art_id, body.type, body.uid)
  ctx.body = res
})

module.exports = router