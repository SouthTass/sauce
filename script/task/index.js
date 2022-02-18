const dayjs = require('dayjs')
const stockPerformanceForeshow = require('./stock-performance-foreshow')
let task = {}

// 初始化任务
task.init = function init(){
  stockPerformanceForeshow.performanceForecast()
  // setIntervalTaskTwoSecond()
}

// 每隔2秒去执行的定时任务
async function setIntervalTaskTwoSecond(){
  setInterval(() => {
    console.log(`当前时间：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
  }, 5000);
}

module.exports = task