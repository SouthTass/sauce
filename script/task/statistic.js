let statistic = {}
const axios = require('axios')
const dayjs = require('dayjs')

const baseMicroUrl = 'http://101.43.217.166:3000/api/micro'

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
      await axios.post('http://101.43.217.166:3000/api/micro/powerball/add', body)
    }
  } catch (error) {
    console.log(error)
  }
}

// 同步连板天梯
statistic.getBoardLadder = async function (){
  const time = dayjs().format('YYYYMMDD')
  // 获取单日数据
  async function getList(time){
    let res = await axios({
      method: 'get',
      url: `https://data.10jqka.com.cn/dataapi/limit_up/continuous_limit_up?filter=HS,GEM2STAR&date=${time}`,
    })
    if(res.status != 200){
      return console.log(`调用接口出错，状态码：${res.status}`)
    }
    if(res.data.status_code != 0){
      return console.log(`数据出错，状态码：${res.status}`)
    }
    let result = []
    res.data.data.forEach(e => {
      e.code_list.forEach(item => {
        result.push({
          code: item.code,
          name: item.name,
          height: e.height,
          time
        })
      })
    })
    return result
  }

  // 记录数据
  async function createItem(){
    let res = await getList(time)
    for(let m = 0; m < res.length; m++){
      await axios({
        method: 'post',
        url: `http://101.43.217.166:3000/api/stock/board-ladder/add`,
        data: res[m]
      })
    }
  }

  createItem()
}

module.exports = statistic