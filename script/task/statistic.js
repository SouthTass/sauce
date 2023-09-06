let statistic = {}
const axios = require('axios')
const dayjs = require('dayjs')

const baseMicroUrl = 'http://101.43.217.166:3000/micro'

// 同步大乐透中奖信息
statistic.getDltList = async function (){
  try {
    // 获取最近10条大乐透数据
    let res = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1&termLimits=10')
    if(res.status != 200) return console.log('大乐透接口出错')
    list = res.data.value.list
    
    // 获取服务器存储的大乐透列表
    let serveRes = await axios.get(`${baseMicroUrl}/powerball/list`, {
      params: {
        type: '大乐透'
      }
    })
    if(serveRes.status != 200) return console.log('查询大乐透接口出错')
    let serveList = serveRes.data.list
    
    // 更新大乐透列表
    for(let i = 0; i < list.length; i++){
      let serveIndex = serveList.findIndex(e => e.code == list[i].lotteryDrawNum)
      if(serveIndex != -1) continue

      let num = list[i].lotteryDrawResult.split(' ')
      let body = {
        type: '大乐透',
        code: list[i].lotteryDrawNum,
        open_prize_date: list[i].lotterySaleEndtime
      }
      for(let m = 0; m < 7; m++){
        body[`ball${m}`] = num[m]
      }
      await axios.post('http://101.43.217.166:3000/micro/powerball/add', body)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = statistic