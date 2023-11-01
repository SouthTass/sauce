const axios = require('axios')
const dayjs = require('dayjs')
let num = 0
async function getWarningFile(){
  let time = dayjs().unix()
  try {
    res = await axios.get(`https://api3.cls.cn/v1/roll/get_roll_list?app=cailianpress&category=announcement&channel=0&cuid=1245D9CE-CA9A-4A94-A900-1F30DB4A3409&last_time=${time}&mb=iPhone11%2C8&net=1&os=ios&ov=15.2&platform=iphone&province_code=1101&refresh_type=1&rn=20&sign=39da8f79d9ac755191bae38b092bbaeb&sv=8.2.5`)
    let content = res.data.data.roll_data[0].content
    let pattern = /机构调研/
    if(pattern.test(content)){
      
    }
  } catch (error) {
    return console.log('调用出错:', JSON.stringify(error))
  }
}

setInterval(() => {
  getWarningFile()
}, 2000)