const axios = require('axios')
const dayjs = require('dayjs')

let text = `1、章盟主
买入：雅本化学、艾布鲁、爱旭股份
卖出：中交地产

2、赵老哥
买入：建艺集团、步步高、鹿山新材、华东重机
卖出：望变电气、华东重机、步步高

3、上海溧阳路
买入：安徽建工、山河药辅、中设股份、盛弘股份、雅本化学、联盛化学、中交地产、湖南发展
卖出：山河药辅、凯淳股份、永泰运、中交地产

4、竞价抢筹
买入：上海港湾、步步高
卖出：若羽臣、徐家汇、步步高

5、歌神
买入：普邦股份
卖出：宏德股份、华东重机、徐家汇

6、成都系
买入：普邦股份
卖出：普邦股份

7、方新侠
买入：复旦复华

8、著名刺客
买入：罗欣药业
卖出：罗欣药业

9、宁波桑田路
卖出：若羽臣

10、西湖国贸
买入：天津松江、奥翔药业

11、作手新一
卖出：华升股份`

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
      record.push({name: e, tag: '买入', source: result[i].name, time: dayjs().format('YYYY-MM-DD')})
    })
  }
  if(result[i].sell){
    result[i].sell.map(e => {
      record.push({name: e, tag: '卖出', source: result[i].name, time: dayjs().format('YYYY-MM-DD')})
    })
  }
}

async function writeRecord(){
  for(let i = 0; i < record.length; i++){
    await axios.post('http://sauce.coconer.cn/stock/idlecapital/add', record[i])
  }
}
writeRecord()