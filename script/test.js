const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

async function writeRecord(){
  
  // if(/^买入|止盈|止损{2}/.test('买一个')){
  //   console.log(1)
  // }else{
  //   console.log(2)
  // }
  let res = await axios.get('https://hq.sinajs.cn/list=sh600438,sh000001', {
    headers: {
      Referer: 'http://finance.sina.com.cn/',
      Accept: 'application/json, text/plain, */*',
    },
  })
  console.log(res)
  // let result = []
  // let data = []
  // res.data.result.map(e => {
  //   data.push(`${e.red}`)
  // })
  // data.map(e => {
  //   let index = result.findIndex(item => {
  //     return item == e
  //   })
  //   if(index > 0){
  //     console.log(e)
  //   }else{
  //     result.push(e)
  //   }
  // })
}
writeRecord()