const fs = require('fs')
const axios = require('axios')

async function writeRecord(){
  let res = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1&termLimits=50000')
  // console.log(res.status)
  // return
  if(res.status != 200) return console.log('程序出错')
  fs.writeFileSync(`${process.cwd()}/temp/dlt.json`, JSON.stringify(res.data.value.list))
  console.log('存储成功')
}
writeRecord()