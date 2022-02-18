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
      record.push({name: e, tag: '买入', source: list[i].name, time: dayjs('2022-02-18').format('YYYY-MM-DD')})
    })
  }
  if(list[i].sell){
    list[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: list[i].name, time: dayjs('2022-02-18').format('YYYY-MM-DD')})
    })
  }
}
async function writeRecord(){
  for(let i = 0; i < record.length; i++){
    await axios.post('http://sauce.coconer.cn/stock/idlecapital/add', record[i])
  }
}
writeRecord()