const axios = require('axios')
const cheerio = require('cheerio')
const dayjs = require('dayjs')

async function writeRecord(msg){
  let html = await axios.get('https://www.100ppi.com/monitor/')
  let $ = cheerio.load(html.data)
  let list = $('.mar table tbody tr')
  $(list).each((index, data) => {
    let td = $(data)
    let a = td.find('a').text()
    if(a == '鸡蛋'){
      let beforeYesterday = 0
      let yesterday = 0
      td.children().each((bIndex, b) => {
        let btmp = $(b).text()
        if(bIndex == 2) beforeYesterday = (btmp / 2).toFixed(2)
        if(bIndex == 3) yesterday = (btmp / 2).toFixed(2)
        if(bIndex == 4){
          if(btmp == '-'){
            msg.say(`鸡蛋前天价格：${beforeYesterday}元\n鸡蛋昨日价格：${yesterday}元\n鸡蛋今日价格未出`)
          }else{
            msg.say(`鸡蛋前天价格：${beforeYesterday}元\n鸡蛋昨日价格：${yesterday}元\n鸡蛋今日价格：${(btmp / 2).toFixed(2)}元`)
          }
        }
      })
    }
  })
}

writeRecord()