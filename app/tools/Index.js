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
    url: 'https://hq.sinajs.cn/?list=hf_XAU',
    method: 'get',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'x-app-id': 'KxBcVoDHStE6CUkQ',
      'x-version': '1.0.0',
      'referer': 'https://finance.sina.com.cn/futures/quotes/XAU.shtml'
    }
  })
  if(res.status != 200){
    ctx.status = 200
    ctx.body = '接口有误'
  }else{
    eval(res.data)
    let arr = hq_str_hf_XAU.split(',')
    ctx.status = 200
    ctx.body = arr[1]
  }
})

module.exports = router