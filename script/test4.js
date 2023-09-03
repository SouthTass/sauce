const axios = require('axios')
let num = 0
async function getWarningFile(bot){
  num++
  let res
  try {
    res = await axios.get(`http://data.10jqka.com.cn/funds/ddzz/order/desc/ajax`)
    return console.log('调用成功:', num, res.status)
  } catch (error) {
    return console.log('调用出错:', JSON.stringify(error))
  }
}

setInterval(() => {
  getWarningFile()
}, 1000)