const axios = require('axios')
const dayjs = require('dayjs')
let list = [
  {  
    name: '章盟主',
    buy: ['天齐锂业', '中矿资源'],
    sell: ['恒宝股份', '保利联合', '元成股份'],
  },
  {
    name: '赵老哥',
    buy: ['正源股份', '实朴检测', '旗天科技', '金财互联'],
    sell: ['实朴检测', '华蓝集团'],
  },
  {
    name: '量化打板',
    buy: ['海天股份', '香溢融通', '正源股份', '实朴检测', '建工修复', '浙江建投', '永兴材料'],
    sell: ['实朴检测', '元成股份', '浙江建投', '岭南股份', '天保基建', '岭南控股'],
  },
  {
    name: '竞价抢筹',
    buy: ['元隆雅图'],
    sell: ['正平股份', '元隆雅图', '浙文影业', '曲江文旅', '浙江建投', '省广集团', '冀东装备', '华媒控股'],
  },
  {
    name: '著名刺客',
    buy: ['实朴检测', '清水源', '旗天科技'],
    sell: ['实朴检测', '华蓝集团'],
  },
  {
    name: '上海溧阳路',
    buy: ['诚达药业'],
    sell: ['诚达药业', '华媒控股'],
  },
  {
    name: '作手新一',
    buy: ['中农联合', '保利联合'],
    sell: ['保利联合'],
  },
  {
    name: '宁波桑田路',
    buy: ['旗天科技'],
  },
  {
    name: '歌神',
    buy: ['清水源'],
  },
  {
    name: '上海超短帮',
    buy: ['天齐锂业', '永兴材料'],
    sell: ['天齐锂业'],
  },
  {
    name: '飞云江路',
    buy: ['金种子酒'],
    sell: ['威星智能']
  }
]

let record = []
for(let i = 0; i < list.length; i++){
  if(list[i].buy){
    list[i].buy.map(e => {
      record.push({name: e, tag: '买入', source: list[i].name, time: dayjs('2022-02-18').format('YYYY-MM-DD HH:mm:ss')})
    })
  }
  if(list[i].sell){
    list[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: list[i].name, time: dayjs('2022-02-18').format('YYYY-MM-DD HH:mm:ss')})
    })
  }
}
async function writeRecord(){
  for(let i = 0; i < record.length; i++){
    await axios.post('http://sauce.coconer.cn/stock/idlecapital/add', record[i])
  }
}
writeRecord()
return

// 净买入
let onlyBuyTmp = []
record.map(e => {
  if(e.tag == '买入') onlyBuyTmp.push(e)
})
let onlyBuy = []
onlyBuyTmp.map(e => {
  let index = record.findIndex(re => e.name == re.name && re.tag == '卖出')
  if(index == -1) onlyBuy.push({...e, num: 0})
})
let a = []
console.log(onlyBuy)
onlyBuy.map(e => a.push(e.name))
console.log(`净买入个股：${a.join('、')}`)

// 净买入统计
let onlyBuyNum = []
onlyBuy.map(e => {
  let index = onlyBuyNum.findIndex(ne => ne.name == e.name)
  if(index == -1) {
    e.num++
    onlyBuyNum.push(e)
  }else{
    onlyBuyNum[index].num++
  }
})
onlyBuyNum = onlyBuyNum.sort((a, b) => {return b.num - a.num})
onlyBuyNum = onlyBuyNum.slice(0, 5)
let b = []
onlyBuyNum.map(e => b.push(`${e.name}(${e.num}次)`))
console.log(`净买入前五：${b.join('、')}`)


// 净卖出
let onlySellTmp = []
record.map(e => {
  if(e.tag == '卖出') onlySellTmp.push(e)
})
let onlySell = []
onlySellTmp.map(e => {
  let index = record.findIndex(re => e.name == re.name && re.tag == '买入')
  if(index == -1) onlySell.push({...e, num: 0})
})
let aa = []
onlySell.map(e => aa.push(e.name))
console.log(`净卖出个股：${aa.join('、')}`)

// 净卖出统计
let onlySellNum = []
onlySell.map(e => {
  let index = onlySellNum.findIndex(ne => ne.name == e.name)
  if(index == -1) {
    e.num++
    onlySellNum.push(e)
  }else{
    onlySellNum[index].num++
  }
})
onlySellNum = onlySellNum.sort((a, b) => {return b.num - a.num})
onlySellNum = onlySellNum.slice(0, 5)
let bb = []
onlySellNum.map(e => bb.push(`${e.name}(${e.num}次)`))
console.log(`净卖出前五：${bb.join('、')}`)