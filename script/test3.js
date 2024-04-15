const axios = require('axios')
const dayjs = require('dayjs')

async function writeRecord(){
  let res = await axios({
    method: 'get',
    url: 'https://data.10jqka.com.cn/dataapi/limit_up/continuous_limit_up?filter=HS,GEM2STAR&date=20240410',
  })
  // if(res.status != 0){
  //   await msg.say(`调用接口出错，状态码：${res.status}`)
  //   return
  // }
  // if(res.data.status_code != 0){
  //   await msg.say(`数据出错，状态码：${res.status}`)
  //   return
  // }
  let result = [`当前连板天梯`]
  res.data.data.forEach(e => {
    let a = []
    e.code_list.forEach(item => a.push(item.name))
    result.push(`${e.height}板：${a.join('、')}`)
  })

  console.log(result.join('\n'))
}
writeRecord()