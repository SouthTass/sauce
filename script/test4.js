// const axios = require('axios')
// const dayjs = require('dayjs')
// let num = 0
// async function getWarningFile(){
//   let time = dayjs().unix()
//   try {
//     res = await axios.get(`https://stock.gtimg.cn/data/index.php?appn=detail&action=data&c=sh600418&p=42`)
//     let result = (JSON.parse(res.data.replace('v_detail_data_sh600418=', '')))[1]
//     console.log(result.split('|'))
//   } catch (error) {
//     return console.log('调用出错:', JSON.stringify(error))
//   }
// }

// getWarningFile()

// // setInterval(() => {
// //   getWarningFile()
// // }, 2000)
let res = { data: { data: '11 12 13 15 30 32 + 03'}}
let type = 'bet'
let result = res.data.data
if(type == 'bet'){
  let arr = result.split(' ')
  result = `s${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}${arr[5]}+${arr[7]}`
  console.log(result)
}