const axios = require('axios')
let list = []
const current = ['06', '15', '16', '32', '33', '02', '07']
async function getWarningFile(){
  let res
  try {
    res = await axios.get(`http://101.43.217.166:3000/micro/powerball/list?type=%E5%A4%A7%E4%B9%90%E9%80%8F`)
    list = res.data.list
    autoHandleResult()
    autoHandleBlueResult()
    handleResult()
    handleBlueRepetition()
  } catch (error) {
    return console.log('调用出错:', JSON.stringify(error))
  }
}
getWarningFile()

function autoHandleResult(){
  let blueList = []
  list.map(e => {
    let count = 0
    let blue5 = e.ball5
    let blue6 = e.ball6
    list.map(item => {
      if((blue5 == item.ball5 || blue5 == item.ball6) && (blue6 == item.ball5 || blue6 == item.ball6)){
        count++
      }
    })
    let text = `大乐透蓝球：${blue5} ${blue6}，出现次数为：${count}`
    let obj = { ball1: blue5, ball2: blue6, count, text }
    let index = blueList.findIndex(item => item.text == text)
    if(index == -1) blueList.push(obj)
  })
  blueList = blueList.sort((a, b) => {
    return a.count - b.count
  })
  console.log('大乐透历届红球组及出现的次数：', blueList)
}

function autoHandleBlueResult(){
  let data = JSON.parse(JSON.stringify(list))
  let BList = []
  data.map(e => {
    BList.push({text: `${e.ball0}${e.ball1}${e.ball2}${e.ball3}${e.ball4}`, num: 0})
  })
  list.map(e => {
    let text = `${e.ball0}${e.ball1}${e.ball2}${e.ball3}${e.ball4}`
    let index = BList.findIndex(b => e.text == text)
    if(index != -1) BList[index].num++
  })
  let result = []
  BList.map(e => {
    if(e.num > 1) result.push(e)
  })
  console.log(`历史数据中蓝球全部重复的为：`, result)
}

function handleResult(){
  let num5 = current[5]
  let num6 = current[6]
  blueCount = 0
  list.map(e => {
    if((num5 == e.ball5 || num5 == e.ball6) && (num6 == e.ball5 || num6 == e.ball6)){
      blueCount++
    }
  })
  console.log(`您的号码黄球出现的次数为：${blueCount}`)
}

function handleBlueRepetition(){
  let count = 0
  list.map(e => {
    let sample = `${current[0]}${current[1]}${current[2]}${current[3]}${current[4]}`
    let eSample = `${e.ball0}${e.ball1}${e.ball2}${e.ball3}${e.ball4}`
    if(sample == eSample) count++
  })
  console.log(`您的号码蓝球完全重复的次数为：${count}`)
}