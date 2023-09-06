const fs = require('fs')
const axios = require('axios')
const dayjs = require('dayjs')

async function writeRecord(){
  let res = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1&termLimits=100000')
  // let res = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1&termLimits=3')
  if(res.status != 200) return console.log('程序出错')
  fs.writeFileSync(`${process.cwd()}/temp/dlt.json`, JSON.stringify(res.data.value.list))
  console.log('存储成功')
}
// writeRecord()


async function readRecord(){
  let list = JSON.parse(fs.readFileSync(`${process.cwd()}/temp/dlt.json`, 'utf8'))
  for(let i = 0; i < list.length; i++){
    let num = list[i].lotteryDrawResult.split(' ')
    let body = {
      type: '大乐透',
      code: list[i].lotteryDrawNum,
      open_prize_date: list[i].lotterySaleEndtime
    }
    for(let m = 0; m < 7; m++){
      body[`ball${m}`] = num[m]
    }
    await axios.post('http://101.43.217.166:3000/micro/powerball/add', body)
  }
}
readRecord()