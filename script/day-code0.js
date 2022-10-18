const axios = require('axios')
const dayjs = require('dayjs')


let res = await axios.get(`http://sqt.gtimg.cn/utf8/q=${tmp.join(',')}`)
  if(res.status != 200) return
  res.data = res.data.replace(/\ +/g,"")
  res.data = res.data.replace(/[\r\n]/g, '')
  let codetmp = res.data.split(';')
  let result = ''
  for(let i = 0; i < codetmp.length; i++){
    if(!codetmp[i]) continue
    let tmp = codetmp[i].split('~')
    let text = `【${tmp[1]}】现价：${tmp[3]}元，涨幅：${tmp[32]}%`
    if(result){
      result += `\n${text}`
    }else{
      result = text
    }
  }
writeRecord()
