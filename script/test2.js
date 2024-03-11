const xlsx = require("node-xlsx")
const fs = require("fs")
const axios = require('axios')


const getList = async () => {
  let res = await axios.get(`http://localhost:3000/micro/company/list`)
  return res.data.list
}

const exportFiles = async () => {
  let res = await getList()
  let list = [{
    name: 'sheet',
    data: []
  }]
  for(let i = 0; i < res.length; i++){
    list[0].data[i] = []
    list[0].data[i].push(res[i].name)
    list[0].data[i].push(res[i].tel)
    list[0].data[i].push(res[i].address)
  }

  const buffer = xlsx.build(list)
  fs.writeFile("testFile.xlsx", buffer, function (err) {
    if (err) {
      console.log(err, "保存excel出错");
    } else {
      console.log("写入excel成功!!!");
    }
  })
}

exportFiles()