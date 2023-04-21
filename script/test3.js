const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

// let files = fs.readdirSync('/Users/wzt/Desktop/b')
// files.forEach(e => {
//   let imgList = fs.readdirSync(`/Users/wzt/Desktop/b/${e}`)
//   imgList.forEach(async (item) => {
//     const result = fs.readFileSync(`/Users/wzt/Desktop/b/${e}/${item}`, 'binary')
//     let res = await axios.post(`https://s0.qll-times.com/api/upload/file`, {
//       file: result
//     })
//     console.log(res)
//     return
//   })
// })

// const result = fs.readFileSync(`/Users/wzt/Desktop/粉色1.jpg`, 'binary')

async function test(){
  // let stream = fs.createReadStream(`/Users/wzt/Desktop/粉色1.jpg`);
  const result = fs.readFileSync(`/Users/wzt/Desktop/123.png`)
  console.log(result)
  
  let res = await axios.post(`https://s0.qll-times.com/api/upload/file`, {
    headers: {
      'Content-Type': 'image/jpge',
    },
    data: {
      file: result
    }
    // formData: {
    //   file: {
    //     value: result.data,
    //     options: {
    //       filename: '123'
    //     }
    //   }
      
    // }
    
  })
  console.log(res)
}
test()


// console.log(files)

// async function writeRecord(){

//   const codelist = JSON.parse(fs.readFileSync(`${process.cwd()}/temp/ssq.json`, 'utf8'))
//   let result = []
//   let data = []
//   codelist.value.list.map(e => {
//     data.push(`${e.lotteryDrawResult}`)
//   })
//   data.map(e => {
//     let index = result.findIndex(item => {
//       return item == e
//     })
//     if(index > 0){
//       console.log(e)
//     }else{
//       result.push(e)
//     }
//   })
// }
// writeRecord()