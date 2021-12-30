const Router = require('koa-router')
const router = new Router({
  prefix: '/utils'
})
const path = require('path')

router.post('/ticket/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.name){
    return ctx.body = {
      message: '股票名称不能为空',
      status: 1
    }
  }
  if(!body.code){
    return ctx.body = {
      message: '股票代码不能为空',
      status: 1
    }
  }
  let fileAddress = path.join('/usr/local/nodejs/projects/my-robot/config', 'code.js')
  const fs = require('fs')
  const buffer = fs.readFileSync(fileAddress)
  let text = String(buffer)
  text = text.replace('module.exports =', '')
  text = JSON.parse(text)
  text.push({
    name: body.name,
    content: body.code
  })
  text = JSON.stringify(text)
  text = 'module.exports = ' + text
  fs.writeFile(fileAddress, text, {flag:'w'}, () => {})
  ctx.body = {
    message: 'ok',
    name: body.name,
    content: body.code,
    status: 0
  }
})

module.exports = router