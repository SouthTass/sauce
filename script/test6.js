const axios = require('axios')


// 鸡蛋今日价格
async function eggTodayPrice(msg){
  let html = await axios.get('https://m1.100ppi.com/vane/1049-%E9%B8%A1%E8%9B%8B.html')

  let $ = cheerio.load(html.data)
  let list = $('.zs-wencon table tbody tr')
  $(list).each((index, data) => {
    let tr = $(data)
    console.log(tr.text())
    // let td = $(data)
    // let a = td.find('a').text()
    // if(a == '鸡蛋'){
    //   td.children().each((bIndex, b) => {
    //     let btmp = $(b).text()
    //     if(bIndex == 2) beforeYesterday = (btmp / 2).toFixed(2)
    //     if(bIndex == 3) yesterday = (btmp / 2).toFixed(2)
    //     if(bIndex == 4){
    //       if(btmp == '-'){
    //         msg.say(`鸡蛋前天价格：${beforeYesterday}元\n鸡蛋昨日价格：${yesterday}元\n鸡蛋今日价格：未出`)
    //       }else{
    //         msg.say(`鸡蛋前天价格：${beforeYesterday}元\n鸡蛋昨日价格：${yesterday}元\n鸡蛋今日价格：${(btmp / 2).toFixed(2)}元`)
    //       }
    //     }
    //   })
    // }
  })
}

eggTodayPrice()