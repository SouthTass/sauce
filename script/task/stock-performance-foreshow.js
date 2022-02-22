let performance = {}
const axios = require('axios')
const cheerio = require("cheerio")
const iconv = require('iconv-lite')

// 查询业绩预告(2021年年报)
performance.performanceForecast = async function (){
  let body = {}
  let res = await axios.get('http://data.10jqka.com.cn/financial/yjyg/#refCountId=data_55e51bcd_490', { 
    responseType: 'arraybuffer'
  })
  if(!res) return
  let str = iconv.decode(Buffer.from(res.data), 'gb2312')
  let html = iconv.encode(str, 'utf8').toString()
  let $ = cheerio.load(html)
  let result = []
  $('table tbody tr').each((index, value) => {
    if(index > 5) return
    // 代码、名称、预告类型、预告内容、变动幅度、上年同期、预告时间、是否已通知、预告时间类型
    let codelist = ['code', 'name', 'foreshow_type', 'content', 'float', 'profit', 'time', 'status', 'type']
    $(value).find('td').each((t_index, t_value) => {
      if(t_index > 0){
        body[codelist[t_index - 1]] = $(t_value).text().trim()
        body.status = 0
        body.type = '2021年年报'
      }
    })
    let tmpBody = JSON.parse(JSON.stringify(body))
    result.push({...tmpBody, status: 0})
  })
  for(let i = 0; i < result.length; i++){
    let url = `http://sauce.coconer.cn/stock/performance/foreshow/find?code=${result[i].code}&type=${result[i].type}`
    let res = await axios.get(encodeURI(url))
    if(res.status == 204){
      axios.post('http://sauce.coconer.cn/stock/performance/foreshow/add', result[i])
    }
  }
}

// 查询业绩预告(2022年一季报)
performance.performanceForecast202201 = async function (){
  let body = {}
  let res
  try{
    res = await axios.get('https://data.10jqka.com.cn/ajax/yjyg/date/2022-03-31', { 
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'text/html, */*; q=0.01',
        'hexin-v': 'A7BQI0U2pqejn3qjkPLfOwsVh3UH-ZzuttroR6oBeRDfdV6rUglk0wbtuN_5',
        'Referer': 'http://data.10jqka.com.cn/financial/yjyg/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    console.log(`请求成功====>vvvv=1; v=A2AVcJ6rFrc6baqzJpsvKzuFN2U3aUQz5k2YN9pxLHsO1Q5bgnkUwzZdaMYp`)
  }catch(error){
    console.log(`请求错误====>${error.response.status}`)
  }
  
  if(!res) return
  let str = iconv.decode(Buffer.from(res.data), 'gb2312')
  let html = iconv.encode(str, 'utf8').toString()
  let $ = cheerio.load(html)
  let result = []
  $('table tbody tr').each((index, value) => {
    if(index > 5) return
    // 代码、名称、预告类型、预告内容、变动幅度、上年同期、预告时间、是否已通知、预告时间类型
    let codelist = ['code', 'name', 'foreshow_type', 'content', 'float', 'profit', 'time', 'status', 'type']
    $(value).find('td').each((t_index, t_value) => {
      if(t_index > 0){
        body[codelist[t_index - 1]] = $(t_value).text().trim()
        body.status = 0
        body.type = '2022年一季报'
      }
    })
    if(body.profit == '-') body.profit = '暂无数据'
    let tmpBody = JSON.parse(JSON.stringify(body))
    result.push({...tmpBody, status: 0})
  })
  for(let i = 0; i < result.length; i++){
    let url = `http://sauce.coconer.cn/stock/performance/foreshow/find?code=${result[i].code}&type=${result[i].type}`
    let res = await axios.get(encodeURI(url))
    if(res.status == 204){
      axios.post('http://sauce.coconer.cn/stock/performance/foreshow/add', result[i])
    }
  }
}

module.exports = performance