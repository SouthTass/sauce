let performance = {}
const axios = require('axios')
const cheerio = require("cheerio")
const iconv = require('iconv-lite')

// 查询业绩预告(2022年一季报)
async function tests (){
  let body = {}
  try {
    let res = await axios.get('https://data.10jqka.com.cn/ajax/yjyg/date/2022-03-31', { 
      responseType: 'arraybuffer'
    })
  } catch (error) {
    console.log(1, error.response.status)
    // let str = iconv.decode(Buffer.from(error.response.data), 'gb2312')
    // let html = iconv.encode(str, 'utf8').toString()
    // console.log(html)
  }
  
  return
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

tests()