const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

async function writeRecord(){
  let res = await axios.get('http://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&pageNo=1&pageSize=2000&systemType=PC', {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Cookie': 'HMF_CI=643356ca157c2da8a4f1d7358a3f196dbaef748e5e6383954bef401dfa9e96388a2a1fd057d06aeda840cb5a804f905435b61640d3cf95bae7293e5dbfb426e40a',
      'Host': 'www.cwl.gov.cn',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    }
  })
  let result = []
  let data = []
  res.data.result.map(e => {
    data.push(`${e.red}`)
  })
  data.map(e => {
    let index = result.findIndex(item => {
      return item == e
    })
    if(index > 0){
      console.log(e)
    }else{
      result.push(e)
    }
  })
}
writeRecord()