const stockPerformanceForeshow = require('./stock-performance-foreshow')
let task = {}

// 初始化任务
task.init = function init(){
  setIntervalTaskFiveSecond()
}

// 每隔5秒去执行的定时任务
async function setIntervalTaskFiveSecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast202203()
    stockPerformanceForeshow.performanceForecast202303()
  }, 5000);
}

module.exports = task