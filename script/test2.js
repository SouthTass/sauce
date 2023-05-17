const fs = require('fs')
const axios = require('axios')

async function writeRecord(){
  // let res = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1&termLimits=50000')
  // if(res.status != 200) return console.log('程序出错')
  // fs.writeFileSync(`${process.cwd()}/temp/dlt.json`, JSON.stringify(res.data.value.list))
  // console.log('存储成功')

  let res = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1&termLimits=1')
  if(res.status != 200) return console.log('程序出错')
  fs.writeFileSync(`${process.cwd()}/temp/dltonly.json`, JSON.stringify(res.data.value.list))
  console.log('存储成功')
}

// writeRecord()


async function readRecord(){
  let list = JSON.parse(fs.readFileSync(`${process.cwd()}/temp/dlt.json`, 'utf8'))

  for(let i = 0; i < list.length; i++){
    let num = list[i].lotteryDrawResult.split(' ')
    let body = {
      type: '大乐透',
      code: list[i].lotteryDrawNum
    }
    for(let m = 0; m < 7; m++){
      body[`ball${m}`] = num[m]
    }
    await axios.post('http://0.0.0.0:3000/micro/powerball/add', body)
  }
}

// readRecord()