const axios = require('axios')
const dayjs = require('dayjs')
let list = [
  {  
    name: '章盟主',
    buy: ['雅本化学', '艾布鲁', '爱旭股份'],
    sell: ['中交地产'],
  },
  {
    name: '赵老哥',
    buy: ['建艺集团', '步步高', '鹿山新材', '华东重机'],
    sell: ['望变电气', '华东重机', '步步高'],
  },
  {
    name: '上海溧阳路',
    buy: ['安徽建工', '山河药辅', '中设股份', '盛弘股份', '雅本化学', '联盛化学', '中交地产', '湖南发展'],
    sell: ['山河药辅', '凯淳股份', '永泰运', '中交地产'],
  },
  {  
    name: '竞价抢筹',
    buy: ['上海港湾', '步步高'],
    sell: ['若羽臣', '徐家汇', '步步高'],
  },
  {  
    name: '歌神',
    buy: ['普邦股份'],
    sell: ['宏德股份', '华东重机', '徐家汇'],
  },
  {  
    name: '成都系',
    buy: ['普邦股份'],
    sell: ['普邦股份'],
  },
  {  
    name: '方新侠',
    buy: ['复旦复华']
  },
  {  
    name: '著名刺客',
    buy: ['罗欣药业'],
    sell: ['罗欣药业'],
  },
  {  
    name: '宁波桑田路',
    sell: ['若羽臣'],
  },
  {  
    name: '西湖国贸',
    buy: ['天津松江', '奥翔药业']
  },
  {  
    name: '作手新一',
    sell: ['华升股份'],
  },
]

let record = []
for(let i = 0; i < list.length; i++){
  if(list[i].buy){
    list[i].buy.map(e => {
      record.push({name: e, tag: '买入', source: list[i].name, time: dayjs('2022-05-11').format('YYYY-MM-DD')})
    })
  }
  if(list[i].sell){
    list[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: list[i].name, time: dayjs('2022-05-11').format('YYYY-MM-DD')})
    })
  }
}
async function writeRecord(){
  for(let i = 0; i < record.length; i++){
    await axios.post('http://sauce.coconer.cn/api/stock/idlecapital/add', record[i])
  }
}
writeRecord()
