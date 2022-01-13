const { GroupWxRecord } = require('../../models/wx/GroupWxRecord')
const Router = require('koa-router')
const router = new Router({
  prefix: '/wx'
})

router.post('/group/record', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.content) throw new global.customError.ServiceError('内容不能为空')
  await GroupWxRecord.saveRecord(body.room, body.name, body.content)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

module.exports = router