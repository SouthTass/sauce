let performance = {}
const axios = require('axios')
const dayjs = require('dayjs')

// 查询业绩预告
performance.performanceForecast202203 = async function (){
  let res
  try {
    res = await axios.get('https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE%2CSECURITY_CODE&sortTypes=-1%2C-1&pageSize=5&pageNumber=1&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL&filter=(REPORT_DATE%3D%272022-12-31%27)(PREDICT_FINANCE_CODE%3D%22005%22)')
    if(!res?.data?.result?.data) return
    let tmpList = res.data.result.data
    let list = []
    tmpList.map(e => {
      let item = {
        code: e.SECURITY_CODE,
        name: e.SECURITY_NAME_ABBR,
        foreshow_type: e.PREDICT_TYPE,
        content: `${e.PREDICT_CONTENT}`,
        float: e.ADD_AMP_LOWER,
        profit: 0,
        time: e.NOTICE_DATE,
        status: 0,
        type: '2022年年报'
        
      }
      list.push(item)
    })
    for(let i = 0; i < list.length; i++){
      let url = `http://127.0.0.1:3000/stock/performance/foreshow/find?code=${list[i].code}&type=${list[i].type}`
      let res = await axios.get(encodeURI(url))
      if(res.status == 204){
        let a = await axios.post('http://127.0.0.1:3000/stock/performance/foreshow/add', list[i])
        console.log(a)
      }else{
        console.log(`【${list[i].code} ${list[i].name}】不是新数据`)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// 查询业绩预告
performance.performanceForecast202303 = async function (){
  let res
  try {
    res = await axios.get('https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE%2CSECURITY_CODE&sortTypes=-1%2C-1&pageSize=5&pageNumber=1&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL&filter=(REPORT_DATE%3D%272023-03-31%27)(PREDICT_FINANCE_CODE%3D%22005%22)')
    if(!res?.data?.result?.data) return
    let tmpList = res.data.result.data
    let list = []
    tmpList.map(e => {
      let item = {
        code: e.SECURITY_CODE,
        name: e.SECURITY_NAME_ABBR,
        foreshow_type: e.PREDICT_TYPE,
        content: `${e.PREDICT_CONTENT}`,
        float: e.ADD_AMP_LOWER,
        profit: 0,
        time: e.NOTICE_DATE,
        status: 0,
        type: '2023年一季报'
      }
      list.push(item)
    })
    for(let i = 0; i < list.length; i++){
      let url = `http://127.0.0.1:3000/stock/performance/foreshow/find?code=${list[i].code}&type=${list[i].type}`
      let res = await axios.get(encodeURI(url))
      if(res.status == 204){
        let a = await axios.post('http://127.0.0.1:3000/stock/performance/foreshow/add', list[i])
        console.log(a)
      }else{
        console.log(`【${list[i].code} ${list[i].name}】不是新数据`)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// 查询指定股票的价格
performance.performanceTimeDayPrice = async function (){
  try {
    let money = 0
    let res = await axios.get(`http://sqt.gtimg.cn/utf8/q=sh000001,sz399001`)
    if (res.status != 200) return []
    res.data = res.data.replace(/\ +/g, "")
    res.data = res.data.replace(/[\r\n]/g, '')
    let codetmp = res.data.split(';')
    codetmp.map(item => {
      let result = item.split('~')
      money += Number(result[37])
    })
    
    await axios.post(`https://sauce.cocosnet.cn/stock/timeprice/add`, {
      code: 'sh999999',
      name: 'A股大盘',
      price: '0.00',
      day_total_price: money,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
  } catch (error) {
    
  }
}

module.exports = performance

performance.performanceTimeDayPrice()