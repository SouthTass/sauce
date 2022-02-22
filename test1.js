let performance = {}
const axios = require('axios')
const cheerio = require("cheerio")
const iconv = require('iconv-lite')

// 查询业绩预告(2022年一季报)
async function tests (){
  let body = {}
  let res = await axios.get('https://data.10jqka.com.cn/ajax/yjyg/date/2022-03-31', { 
    responseType: 'arraybuffer',
    headers: {
      'Cookie': 'searchGuide=sg; Hm_lvt_f79b64788a4e377c608617fba4c736e2=1644918805,1645173346,1645430566; Hm_lvt_60bad21af9c824a4a0530d5dbf4357ca=1644918805,1645173346,1645430566; Hm_lvt_78c58f01938e4d85eaf619eae71b4ed1=1645080172,1645173329,1645174075,1645430566; log=; Hm_lpvt_78c58f01938e4d85eaf619eae71b4ed1=1645515717; Hm_lpvt_f79b64788a4e377c608617fba4c736e2=1645515717; Hm_lpvt_60bad21af9c824a4a0530d5dbf4357ca=1645515717; v=A-IClYN89ClcR-h1yr3NBbUvNWNBM-ZNmDfacSx7DtUA_4zdFMM2XWjHKoD_',
    }
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