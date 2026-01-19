const xlsx = require("node-xlsx")
const fs = require("fs")
const axios = require('axios')
const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const today = dayjs().format('YYYY-MM-DD')


const getList = async () => {
  let res = await axios.get(`http://localhost:3000/api/micro/company/list`)
  return res.data.list
}

const exportFiles = async () => {
  let nowWeek = dayjs().day()
  console.log(nowWeek)
  if(dayjs().isBetween(`${today} 09:00:00`, `${today} 18:00:00`) || dayjs().isBetween(`${today} 21:00:00`, `${today} 23:00:00`)){
    console.log(1)
  }else{
    console.log(2)
  }
}

setInterval(() => {
  exportFiles()
}, 1000);
