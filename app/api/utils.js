const Router = require('koa-router')
const router = new Router({
  prefix: '/utils'
})

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
  let fileAddress = '/usr/local/nodejs/projects/my-robot/config/code.js'
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
  console.log(123, text)
  fs.writeFile(fileAddress, text, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
  ctx.body = {
    message: 'ok',
    name: body.name,
    content: body.code,
    status: 0
  }
})

module.exports = router