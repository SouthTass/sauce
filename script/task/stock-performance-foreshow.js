let performance = {}
const axios = require('axios')
const cheerio = require("cheerio")
const iconv = require('iconv-lite')

// 查询业绩预告
performance.performanceForecast202203 = async function (){
  let res
  try {
    res = await axios.get('https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE%2CSECURITY_CODE&sortTypes=-1%2C-1&pageSize=5&pageNumber=1&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL&filter=(REPORT_DATE%3D%272022-09-30%27)(PREDICT_FINANCE_CODE%3D%22005%22)')
    if(!(res?.data?.result?.data)) return
    let tmpList = res.data.result.data
    let list = []
    tmpList.map(e => {
      list.push({
        code: e.SECURITY_CODE,
        name: e.SECURITY_NAME_ABBR,
        foreshow_type: e.PREDICT_TYPE,
        content: e.CHANGE_REASON_EXPLAIN || e.PREDICT_CONTENT,
        float: e.ADD_AMP_LOWER,
        profit: 0,
        time: e.NOTICE_DATE,
        status: 0,
        type: '2022年半年报'
      })
    })
    for(let i = 0; i < list.length; i++){
      let url = `http://sauce.coconer.cn/stock/performance/foreshow/find?code=${list[i].code}&type=${list[i].type}`
      let res = await axios.get(encodeURI(url))
      if(res.status == 204){
        let a = await axios.post('http://sauce.coconer.cn/stock/performance/foreshow/add', list[i])
        console.log(a)
      }else{
        console.log(`请求成功====>【${list[i].code} ${list[i].name}】不是新数据`)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = performance