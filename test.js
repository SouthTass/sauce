let list = [{  
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
  buy: ['海天股份', '香溢融通', '正源股份', '实朴检测', '建工修复', '浙江建投', '永兴材料等'],
  sell: ['实朴检测', '元成股份', '浙江建投', '岭南股份', '天保基建', '岭南控股等'],
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
}]

let record = []
for(let i = 0; i < list.length; i++){
  if(list[i].buy){
    list[i].buy.map(e => {
      record.push({name: e, tag: '买入', source: list[i].name})
    })
  }
  if(list[i].sell){
    list[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: list[i].name})
    })
  }
}

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

// 净卖出
let onlySellTmp = []
record.map(e => {
  if(e.tag == '卖出') onlySellTmp.push(e)
})
let onlySell = []
onlySellTmp.map(e => {
  let index = record.findIndex(re => e.name == re.name && re.tag == '买入')
  if(index == -1) onlySell.push(e)
})