const statistic = require('./statistic')
const schedule = require('node-schedule')

let task = {}
//其他规则见 https://www.npmjs.com/package/node-schedule
//规则参数讲解    *代表通配符
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// 每分钟的第30秒触发： '30 * * * * *'
// 每小时的1分30秒触发 ：'30 1 * * * *'
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

// 初始化任务
task.init = function init(){
  // setIntervalTaskFiveSecond()
  // setIntervalTaskSixtySecond()

  // 每分钟的第一秒执行
  schedule.scheduleJob('01 * * * * *', () => {
    // console.log('定时任务执行中')
  })

  // 每天执行22点执行
  schedule.scheduleJob('1 7 22 * * *', () => {
    console.log('获取大乐透数据')
    statistic.getDltList()
  })

  // 每天执行15点10分执行
  schedule.scheduleJob('1 10 15 * * *', () => {
    console.log('获取连板天梯数据')
    statistic.getBoardLadder()
  })

  setInterval(() => {
    
  }, 3000)
}

module.exports = task