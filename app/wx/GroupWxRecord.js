const dayjs = require('dayjs')
const { GroupWxRecord } = require('../../models/wx/GroupWxRecord')
const Router = require('koa-router')
const router = new Router({
  prefix: '/wx'
})

router.post('/group/record', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.content) throw new global.customError.ServiceError('内容不能为空')
  await GroupWxRecord.saveRecord(body.room, body.name, body.content, body.wxid, body.type)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

router.get('/chat/num', async (ctx, next) => {
  let res = await GroupWxRecord.getChatNum()
  if(!res) throw new global.customError.ServiceError('暂无数据')
  ctx.status = 200
  ctx.body = res
})

router.get('/chat/record', async (ctx, next) => {
  let query = ctx.query
  let params = query
  if(!query.start_time) params.start_time = `${dayjs().format('YYYY-MM-DD')} 00:00:00`
  if(!query.end_time) params.end_time = `${dayjs().format('YYYY-MM-DD')} 23:59:59`
  let res = await GroupWxRecord.getChatRecord(params)
  if(!res) throw new global.customError.ServiceError('暂无数据')
  ctx.status = 200
  ctx.body = res
})

router.get('/chat/user', async (ctx, next) => {
  let res = await GroupWxRecord.getChatUser(ctx.query.room)
  if(!res) throw new global.customError.ServiceError('暂无数据')
  ctx.status = 200
  ctx.body = res
})

router.get('/chat/user/123', async (ctx, next) => {
  let res = await GroupWxRecord.getChatUserXi()
})

module.exports = router