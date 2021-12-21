const Router = require('koa-router')
const router = new Router({ prefix: '/classic' })
const AuthNmu = 10086

const { Auth } = require('../../middlewars/auth')
const { Flow } = require('../../models/flow')
const { Favor } = require('../../models/favor')
const { Art } = require('../../models/art')

router.get('/test', new Auth(123).m, async(ctx, next) => {
  ctx.body = ctx.auth.uid
})

router.get('/latest', new Auth(AuthNmu).m, async(ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Favor.referFavorItem(flow.art_id, flow.type, flow.index)
  ctx.body = art
})

router.get('/:index/next', new Auth(AuthNmu).m, async(ctx, next) => {
  const index = parseInt(ctx.params.index)
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  if(!flow) throw new global.customError.NotFound()
  const art = await Favor.referFavorItem(flow.art_id, flow.type, flow.index)
  ctx.body = art
})

router.get('/:index/previous', new Auth(AuthNmu).m, async(ctx, next) => {
  const index = parseInt(ctx.params.index)
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if(!flow) throw new global.customError.NotFound()
  const art = await Favor.referFavorItem(flow.art_id, flow.type, flow.index)
  ctx.body = art
})

router.get('/:id/:type/favor', new Auth(AuthNmu).m, async (ctx, next) => {
  const id = ctx.params.id
  const type = parseInt(ctx.params.type)
  const art = await Art.getData(id, type)
  if(!art) throw new global.customError.NotFound()
  const favor = await Favor.userLikeStatus(id, type, 3)
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: favor
  }
})

module.exports = router