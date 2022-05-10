const axios = require('axios')
const dayjs = require('dayjs')
let list = [
  {  
    name: '章盟主',
    sell: ['国投中鲁'],
  },
  {
    name: '赵老哥',
    buy: ['复旦复华'],
  },
  {
    name: '上海溧阳路',
    buy: ['浙江建投', '精华制药', '中交地产'],
    sell: ['精华制药', '永泰运', '凯淳股份'],
  },
  {
    name: '猪肉荣',
    buy: ['德新交运', '奥翔药业'],
    sell: ['中信博'],
  },
  {
    name: '著名刺客',
    buy: ['杭州园林'],
    sell: ['永安药业'],
  },
  {
    name: '西湖国贸',
    buy: ['奥翔药业'],
  },
  {
    name: '宁波桑田路',
    buy: ['金埔园林'],
  },
  {
    name: '炒股养家',
    buy: ['中交地产'],
  }
]

let record = []
for(let i = 0; i < list.length; i++){
  if(list[i].buy){
    list[i].buy.map(e => {
      record.push({name: e, tag: '买入', source: list[i].name, time: dayjs('2022-05-10').format('YYYY-MM-DD')})
    })
  }
  if(list[i].sell){
    list[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: list[i].name, time: dayjs('2022-05-10').format('YYYY-MM-DD')})
    })
  }
}
async function writeRecord(){
  for(let i = 0; i < record.length; i++){
    await axios.post('http://sauce.coconer.cn/stock/idlecapital/add', record[i])
  }
}
writeRecord()
