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
  console.log(1)
  text = text.replace('module.exports =', '')
  console.log(2)
  text = JSON.parse(text)
  console.log(3)
  text.push({
    name: body.name,
    content: body.code
  })
  console.log(4)
  text = JSON.stringify(text)
  console.log(5)
  text = 'module.exports = ' + text
  console.log(6)
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