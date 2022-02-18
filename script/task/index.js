const dayjs = require('dayjs')
const stockPerformanceForeshow = require('./stock-performance-foreshow')
let task = {}

// 初始化任务
task.init = function init(){
  setIntervalTaskTwoSecond()
}

// 每隔2秒去执行的定时任务
async function setIntervalTaskTwoSecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast()
  }, 5000);
}

module.exports = task