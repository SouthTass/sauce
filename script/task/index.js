const stockPerformanceForeshow = require('./stock-performance-foreshow')
let task = {}

// 初始化任务
task.init = function init(){
  setIntervalTaskFiveSecond()
  setIntervalTaskSixtySecond()
}

// 每隔5秒去执行的定时任务
async function setIntervalTaskFiveSecond(){
  setInterval(() => {
    // stockPerformanceForeshow.performanceTimeDayPrice()
  }, 5000)
}

// 每隔60秒去执行的定时任务
async function setIntervalTaskSixtySecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast()
  }, 60000)
}

module.exports = task