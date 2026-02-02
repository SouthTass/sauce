const dayjs = require('dayjs')
const axios = require('axios')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/tools'
})

// 获取服务器当前时间
router.get('/time/now', async (ctx, next) => {
  ctx.status = 200
  ctx.body = dayjs().format('YYYY-MM-DD HH:mm:ss')
})

// 获取国际黄金价格
router.get('/price/xauusd', async (ctx, next) => {
  let res = await axios({
    url: 'https://api.jijinhao.com/sQuoteCenter/realTime.htm?code=JO_92233&_=1770013101589',
    method: 'get',
    headers: {
      'User-Agent': 'JTW/6.21.0 (iPhone; iPhone11,8; 18.6; Scale/2.00)',
      'Referer': 'https://quote.cngold.org/'
    }
  })
  if(res.status != 200){
    ctx.status = 200
    ctx.body = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }else{
    eval(res.data)
    let arr = hq_str.split(',')
    ctx.status = 200
    ctx.body = arr[3]
  }
})

module.exports = router