const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 查询指定席位盈亏席位
 * @param { string } start_date   开始日期
 * @param { string } end_date     结束日期
 * @param { string } type         类型，固定为variety
 * @param { string } variety      商品编码
 */
async function getPositionProfitRank(data){
  let res = await axios({
    url: 'https://fupage.10jqka.com.cn/futgwapi/api/market/dragon_tiger/v1/position_profit_rank',
    method: 'post',
    data
  })
  if(res.status != 200) return { status: 1, message: `同花顺期货通查询盈亏排行接口无法访问` }
  if(res.data.code != 0) return { status: 1, message: res.data.msg }
  let list = res.data.data.profit_detail_list.sort((a, b) => Number(b.day_profit) - Number(a.day_profit))
  let result = {
    status: 0,
    message: res.data.data.date,
    list
  }
  return result
}

/**
 * 查询指定时间席位持仓排名
 * @param { string } date         查询日期
 * @param { string } variety      商品类型
 * @param { string } contract     商品合约
 */
async function getDealPosition(date, variety, contract){
  let res = await axios({
    url: `https://fupage.10jqka.com.cn/futgwapi/api/market/v1/position/getDealPosition/?date=${date}&variety=${variety}&contract=${contract}`,
    method: 'get'
  })
  if(res.status != 200) return { status: 1, message: `同花顺期货通查询席位排名接口无法访问` }
  if(res.data.code != 0) return { status: 1, message: res.data.msg }
  let result = {
    status: 0,
    message: res.data.data.msg,
    top: res.data.data.topTwentyPositionSum,
    list: res.data.data.positionList
  }
  return result
}

/**
 * 计算盈利席位情况
 * @param { string } data         席位
 * @param { string } list         持仓数据
 */
function getSearDetail(data, list, type){
  let res = data.slice(0, 5)
  let moreChange = 0
  let moreChangeLength = 0
  let moreChangeWeight = 0
  let emptyChange = 0
  let emptyChangeLength = 0
  let emptyChangeWeight = 0
  res.map(e => {
    let index = list.findIndex(item => item.company == e.company)
    if(index != -1){
      if(list[index].f009n){
        e.f009n = list[index].f009n
        e.f013n = list[index].f013n
        moreChangeLength += 1
      }else{
        e.f009n = 0
        e.f013n = 0
      }
      if(list[index].f015n){
        e.f015n = list[index].f015n
        e.f019n = list[index].f019n
        emptyChangeLength += 1
      }else{
        e.f015n = 0
        e.f019n = 0
      }
    }else{
      e.f009n = 0
      e.f013n = 0
      e.f015n = 0
      e.f019n = 0
    }
  })
  res.map(e => {
    moreChange += Number(e.f013n)
    moreChangeWeight += Math.ceil(Number(e.f013n) * Number(e.day_profit) / 100000000)
    emptyChange += e.f019n
    emptyChangeWeight += Math.ceil(Number(e.f019n) * Number(e.day_profit) / 100000000)
  })

  if(type == 1){
    console.log(res, moreChangeLength, emptyChangeLength)
  }

  return `多头：${moreChange}，空头：${emptyChange}\n计算权重后\n多头：${Math.ceil(moreChangeWeight / moreChangeLength)}，空头：${Math.ceil(emptyChangeWeight / emptyChangeLength)}`
}

/**
 * 查询期货分析
 * @param { string } date         查询日期
 * @param { string } variety      商品类型
 * @param { string } contract     商品合约
 * @param { string } name         商品名称
 */
async function getRank(body){
  let rankParamsList = []
  let daySection = [30, 90, 180, 365]
  for(let i = 0; i < daySection.length; i++){
    rankParamsList.push({
      end_date: body.date,
      start_date: dayjs(body.date).subtract(daySection[i], 'day').format('YYYY-MM-DD'),
      type: 'variety',
      variety: body.variety
    })
  }
  
  let Rank30 = await getPositionProfitRank(rankParamsList[0])
  if(Rank30.status != 0) return { status: 1, message: Rank30.message }
  delay(1000)

  let Rank90 = await getPositionProfitRank(rankParamsList[1])
  if(Rank90.status != 0) return { status: 1, message: Rank90.message }
  delay(1000)

  let Rank180 = await getPositionProfitRank(rankParamsList[2])
  if(Rank180.status != 0) return { status: 1, message: Rank180.message }
  delay(1000)

  let Rank365 = await getPositionProfitRank(rankParamsList[3])
  if(Rank365.status != 0) return { status: 1, message: Rank365.message }
  delay(1000)

  let res = await getDealPosition(body.date, body.variety, `${body.variety}${body.contract}`)
  if(res.status != 0) return { status: 1, message: res.message }

  let textResult = []
  textResult.push(`${body.name}${body.date}数据分析`)

  textResult.push(`\n前20名持仓`)
  let todayIndex = res.top.findIndex(e => e.tradeDate == body.date)
  if(todayIndex < 0) return { status: 1, message: `前20名今日持仓数据出错` }
  textResult.push(`[上日]多头：${res.top[todayIndex + 1].f009nSum}，空头：${res.top[todayIndex + 1].f015nSum}，变动：${((res.top[todayIndex].f009nSum - res.top[todayIndex + 1].f009nSum) / res.top[todayIndex + 1].f009nSum * 100).toFixed(2)}%`)
  textResult.push(`[今日]多头：${res.top[todayIndex].f009nSum}，空头：${res.top[todayIndex].f015nSum}，变动：${((res.top[todayIndex].f015nSum - res.top[todayIndex + 1].f015nSum) / res.top[todayIndex + 1].f015nSum * 100).toFixed(2)}%`)

  textResult.push(`\n近30天盈利席位今日持仓变化`)
  textResult.push(getSearDetail(Rank30.list, res.list, 1))
  
  textResult.push(`\n近90天盈利席位今日持仓变化`)
  textResult.push(getSearDetail(Rank90.list, res.list))

  textResult.push(`\n近180天盈利席位今日持仓变化`)
  textResult.push(getSearDetail(Rank180.list, res.list))

  textResult.push(`\n近365天盈利席位今日持仓变化`)
  textResult.push(getSearDetail(Rank365.list, res.list))

  textResult.push(body.date, dayjs(body.date).subtract(30, 'day').format('YYYY-MM-DD'))
  console.log(textResult.join('\n'))
}
// getRank({date: '2025-03-14', variety: 'Y', contract: '2505', name: '豆油'})


function getAnalyes(msg, text){
  let arr = text.split(' ')
  // if(arr.length != 3 || arr.length !=4) return msg.say('输入格式有误，如：期货 豆油 2505 2025-03-14，默认查最近一个交易日，最后一个日期可省略。')
  if(arr.length != 3 && arr.length !=4) return console.log('输入格式有误，如：期货 豆油 2505 2025-03-14')
  let futuresList = {
    '豆油': 'Y'
  }
  let params = {
    variety: futuresList[arr[1]],
    contract: arr[2],
    name: arr[1]
  }
  if(arr.length == 4) params.date = arr[3]
  console.log(params)
  getRank(params)
}

getAnalyes(123, '期货 豆油 2505 2025-03-14')