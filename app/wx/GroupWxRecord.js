const dayjs = require('dayjs')
const { GroupWxRecord } = require('../../models/wx/GroupWxRecord')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/wx'
})

router.post('/group/record', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.content) throw new global.customError.ServiceError('内容不能为空')
  await GroupWxRecord.saveRecord(body.room, body.name, body.content, body.wxid, body.type, body.record_at, body.room_id)
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

router.get('/chat/record/first', async (ctx, next) => {
  let res = await GroupWxRecord.getFirstChatRecord(ctx.query)
  if(!res) throw new global.customError.ServiceError('暂无数据')
  ctx.status = 200
  ctx.body = res
})


router.get('/chat/record/txt', async (ctx, next) => {
  let query = ctx.query
  let params = query
  // let params = {
  //   room: '装犊子群',
  //   type: 'text',
  //   start_time: '2025-06-25 00:00:00',
  //   end_time: '2025-06-26 00:00:00'
  // }
  if(!query.start_time) params.start_time = `${dayjs().format('YYYY-MM-DD')} 00:00:00`
  if(!query.end_time) params.end_time = `${dayjs().format('YYYY-MM-DD')} 23:59:59`
  let res = await GroupWxRecord.getChatRecordAes(params)
  if(!res) throw new global.customError.ServiceError('暂无数据')
  

  let text = []
  res.map(e => {
    text.push(`${e.from_name}：${e.content}`)
  })
  console.log(text.join('\n'))

  ctx.status = 200
  ctx.body = text
})


module.exports = router