let performance = {}
const axios = require('axios')
const cheerio = require("cheerio")
const iconv = require('iconv-lite')

// 查询业绩预告(2022年一季报)
async function tests (){
  let res
  try {
    res = await axios.get('http://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE%2CSECURITY_CODE&sortTypes=-1%2C-1&pageSize=50&pageNumber=1&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL&filter=(REPORT_DATE%3D%272022-03-31%27)(PREDICT_FINANCE_CODE%3D%22005%22)')
    if(!(res?.data?.result?.data)) return
    let tmpList = res.data.result.data.slice(0, 5)
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
        type: '2022年一季报'
      })
      for(let i = 0; i < list.length; i++){
        let url = `http://sauce.coconer.cn/stock/performance/foreshow/find?code=${list[i].code}&type=${list[i].type}`
        let res = await axios.get(encodeURI(url))
        if(res.status == 204){
          axios.post('http://sauce.coconer.cn/stock/performance/foreshow/add', list[i])
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

tests()