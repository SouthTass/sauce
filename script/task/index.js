const dayjs = require('dayjs')
const stockPerformanceForeshow = require('./stock-performance-foreshow')
let task = {}

// 初始化任务
task.init = function init(){
  setIntervalTaskFiveSecond()
  setIntervalTaskTwentySecond()
}

// 每隔5秒去执行的定时任务
async function setIntervalTaskFiveSecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast()
  }, 5000);
}

// 每隔10秒去执行的定时任务
async function setIntervalTaskTwentySecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast202201()
  }, 20000);
}

module.exports = task