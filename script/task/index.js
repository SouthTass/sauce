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
    
  }, 5000)
}

// 每隔60秒去执行的定时任务
async function setIntervalTaskSixtySecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast202203()
    stockPerformanceForeshow.performanceForecast202303()
  }, 60000)
}

module.exports = task