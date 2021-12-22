const { GroupWxRecord } = require('../../models/wx/GroupWxRecord')
const Router = require('koa-router')
const router = new Router({
  prefix: '/wx'
})

router.post('/group/record', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.content) throw new global.customError.ServiceError('内容不能为空')
  GroupWxRecord.saveRecord(body.name, body.content)
})

module.exports = router