const dayjs = require('dayjs')
const stockPerformanceForeshow = require('./stock-performance-foreshow')
let task = {}

// 初始化任务
task.init = function init(){
  setIntervalTaskFiveSecond()
  setIntervalTaskFortySecond()
}

// 每隔5秒去执行的定时任务
async function setIntervalTaskFiveSecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast()
    stockPerformanceForeshow.performanceForecast202203()
  }, 5000);
}

// 每隔10秒去执行的定时任务
async function setIntervalTaskFortySecond(){
  setInterval(() => {
    stockPerformanceForeshow.performanceForecast202201()
  }, 30000);
}

module.exports = task