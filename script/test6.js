const axios = require('axios')
const dayjs = require('dayjs')

async function getSecuritiesDiff(){
  try {
    Promise.all([getSecuritiesTodayFunction(), getSecuritiesYesterdayFunction()])
    .then(function (results) {
      const t = results[0]
      const y = results[1]
      
      let now = dayjs().subtract(1, 'minute').format('HH:mm')
      let todayNum = parseInt(t[now] / 100000000)
      let yesterdayNum = parseInt((y.filter(e => e.TRADE_TIME == now))[0].SUMTVAL / 100000000)
      let text = `今日成交额：${todayNum}亿元\n昨日同期成交额：${todayNum}亿元\n差额：${parseInt(todayNum - yesterdayNum)}亿元`
    })
  } catch (error) {
    return console.log('今日成交额对比调用出错:', JSON.stringify(error))
  }
}

// 获取今日交易数据
async function getSecuritiesTodayFunction(){
  let res = await axios.get('https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_CUSTOM_BULL_AND_BEAR_WIND_INDICATOR&source=securities&client=APP')
  if(res.status != 200) return []
  
  let dictionaries = {}
  res.data.result.TREANDS.map(e => {
    for(let key in e){
      dictionaries[key] = e[key]
    }
  })
  return dictionaries
}

// 获取昨天交易数据
async function getSecuritiesYesterdayFunction(){
  let res = await axios.get('https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_DMSK_WINDVANE_FSHIS&columns=TRADE_DATE,TRADE_TIME,SUMTVAL&sortTypes=1&sortColumns=TRADE_TIME&source=securities&client=APP')
  if(res.status != 200) return []
  return res.data.result.data
}

getWarningFile()