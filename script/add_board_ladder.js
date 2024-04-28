const axios = require('axios')
const dayjs = require('dayjs')

// 获取单日数据
async function getList(time){
  let res = await axios({
    method: 'get',
    url: `https://data.10jqka.com.cn/dataapi/limit_up/continuous_limit_up?filter=HS,GEM2STAR&date=${time}`,
  })
  if(res.status != 200){
    return console.log(`调用接口出错，状态码：${res.status}`)
  }
  if(res.data.status_code != 0){
    return console.log(`数据出错，状态码：${res.status}`)
  }
  let result = []
  res.data.data.forEach(e => {
    e.code_list.forEach(item => {
      result.push({
        code: item.code,
        name: item.name,
        height: e.height,
        time
      })
    })
  })
  return result
}

// 记录数据
async function createItem(){
  for(let i = 0; i < 60; i++){
    let res = await getList(dayjs().subtract(i, 'day').format('YYYYMMDD'))
    for(let m = 0; m < res.length; m++){
      await axios({
        method: 'post',
        url: `http://101.43.217.166:3000/api/stock/board-ladder/add`,
        data: res[m]
      })
    }
  }
}

createItem()