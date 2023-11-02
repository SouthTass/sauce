let performance = {}
const axios = require('axios')
const dayjs = require('dayjs')

// 查询业绩预告
performance.performanceForecast = async function (){
  let res
  try {
    res = await axios.get('https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE%2CSECURITY_CODE&sortTypes=-1%2C-1&pageSize=5&pageNumber=1&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL&filter=(REPORT_DATE%3D%272023-09-30%27)(PREDICT_FINANCE_CODE%3D%22005%22)')
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
        type: '2023年三季报'
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
      if(result[37]) money += Number(result[37])
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

// 查询同花顺快讯
performance.thsNews = async function (){
  let res
  try {
    res = await axios.get('https://news.10jqka.com.cn/tapp/news/push/stock/?kid=0&tag=%E5%BC%82%E5%8A%A8&trace=website')
    if(res.status == 200 && res.data.code != 200) return console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}查询数据返回错误结果`)
    if(res.data.data.list.length < 1) return
    let data = res.data.data.list[0]
    let url = `http://127.0.0.1:3000/stock/performance/foreshow/find?code=${data.id}&type=同花顺新闻`
    let result = await axios.get(encodeURI(url))
    if(result.status == 204){
      await axios.post('http://127.0.0.1:3000/stock/performance/foreshow/add', {
        code: data.id,
        name: data.title,
        foreshow_type: '异动',
        content: data.digest,
        float: 0,
        profit: 0,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        status: 0,
        type: '同花顺新闻'
      })
    }else{
      console.log(`不是新数据：【${data.id}】${data.title}`)
    }
  } catch (error) {
    console.log(error)
  }
}

// 查询财联社研报
performance.ResearchReport = async function (){
  let time = dayjs().unix()
  let res
  try {
    res = await axios.get(`https://api3.cls.cn/v1/roll/get_roll_list?app=cailianpress&channel=0&cuid=1245D9CE-CA9A-4A94-A900-1F30DB4A3409&last_time=${time}&mb=iPhone11%2C8&net=1&os=ios&ov=15.2&platform=iphone&province_code=1101&refresh_type=1&rn=20&sign=39da8f79d9ac755191bae38b092bbaeb&sv=8.2.5`)
    if(res.status != 200) return console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}查询数据返回错误结果`)
    if(res.data.data.roll_data.length < 1) return
    let data = res.data.data.roll_data[0]
    let content = data.content
    let pattern = /机构调研/
    if(!pattern.test(content)) return console.log('不是研报：', data.title, data.content)
    let url = `http://127.0.0.1:3000/stock/performance/foreshow/find?code=${data.id}&foreshow_type=研报`
    let result = await axios.get(encodeURI(url))
    if(result.status == 204){
      await axios.post('http://127.0.0.1:3000/stock/performance/foreshow/add', {
        code: data.id,
        name: data.title,
        foreshow_type: '研报',
        content: data.content,
        float: 0,
        profit: 0,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        status: 0,
        type: '财联社'
      })
    }else{
      console.log(`不是新数据：【${data.id}】${data.title}`)
    }
  } catch (error) {
    console.log(error)
  }
}

// 同步大乐透中奖信息
performance.getDltList = async function (){
  let res
  try {
    res = await axios.get('https://news.10jqka.com.cn/tapp/news/push/stock/?kid=0&tag=%E5%BC%82%E5%8A%A8&trace=website')
    if(res.status == 200 && res.data.code != 200) return console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}查询数据返回错误结果`)
    if(res.data.data.list.length < 1) return
    let data = res.data.data.list[0]
    let url = `http://127.0.0.1:3000/stock/performance/foreshow/find?code=${data.id}&type=同花顺新闻`
    let result = await axios.get(encodeURI(url))
    if(result.status == 204){
      await axios.post('http://127.0.0.1:3000/stock/performance/foreshow/add', {
        code: data.id,
        name: data.title,
        foreshow_type: '异动',
        content: data.digest,
        float: 0,
        profit: 0,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        status: 0,
        type: '同花顺新闻'
      })
    }else{
      console.log(`不是新数据：【${data.id}】${data.title}`)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = performance