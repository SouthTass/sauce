const axios = require('axios')
const dayjs = require('dayjs')

let text = `1、章盟主
买入：长安汽车
卖出：金陵饭店

2、上海溧阳路
买入：联盛化学、利和兴、新华制药
卖出：金埔园林、利和兴、新华制药、中交地产

3、宁波桑田路
买入：通达电气、湖南天雁
卖出：嘉环科技、恒大高新、泰慕士

4、竞价抢筹
买入：金陵饭店
卖出：瑞茂通

5、著名刺客
买入：财信发展、亿利达

6、猪肉荣
卖出：嘉环科技

7、作手新一
买入：运机集团

8、歌神
卖出：普邦股份、恒大高新

9、银河绍兴路
买入：特发服务
卖出：上海九百、艾布鲁、建艺集团、步步高

10、竞价抢筹
买入：金陵饭店
卖出：瑞茂通

11、飞云江路
买入：登云股份`

let result = []
let a = text.split(`\n`)
a.map(e => {
  let item = {}
  if(/[0-9]{1,2}、.*/.test(e)){
    let tmp = e.split('、')
    item.name = tmp[1]
    result.push(item)
  }else if(e.includes('买入')){
    let a = e.split('：')
    let list = a[1].split('、')
    result[result.length - 1].buy = list
  }else if(e.includes('卖出')){
    let a = e.split('：')
    let list = a[1].split('、')
    result[result.length - 1].sell = list
  }
})

let record = []
for(let i = 0; i < result.length; i++){
  if(result[i].buy){
    result[i].buy.map(e => {
      record.push({name: e, tag: '买入', source: result[i].name, time: dayjs('2022-05-13').format('YYYY-MM-DD')})
    })
  }
  if(result[i].sell){
    result[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: result[i].name, time: dayjs('2022-05-13').format('YYYY-MM-DD')})
    })
  }
}

async function writeRecord(){
  for(let i = 0; i < record.length; i++){
    await axios.post('http://sauce.coconer.cn/api/stock/idlecapital/add', record[i])
  }
}
writeRecord()