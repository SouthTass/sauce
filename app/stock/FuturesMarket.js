const { default: axios } = require('axios')
const { AccessTokenManager } = require('../../services/thsServices')
const Router = require('koa-router')
const router = new Router({
  prefix: '/futures'
})

router.post('/market', async (ctx, next) => {
  let token = await AccessTokenManager.getAccessToken()
  try {
    let res = await axios({
      method: 'post',
      url: 'https://quantapi.51ifind.com/api/v1/real_time_quotation',
      headers: {
        'Content-Type': 'application/json',
        'access_token': token
      },
      data: {
        "codes":"JD2405.DCE","indicators":"volume,open,high,low,close,amount,change,sellVolume,buyVolume,openInterest,changeRatio_periodical","starttime":"2024-03-28 09:15:00","endtime":"2024-03-28 15:15:00"
      }
    })
    console.log(1, res.data.tables[0].table.amount)
  } catch (error) {
    console.log(error)
  }
})


// 查询大盘同一时间交易数量
router.get('/allrpice', async (ctx, next) => {
  let res = await StockTimePrice.getOneItemInCurrentTime(ctx.query)
  if(res) ctx.body = res
})
module.exports = router