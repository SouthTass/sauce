const dayjs = require('dayjs')
const { Powerball } = require('../../models/micro/Powerball')
const Router = require('koa-router')
const router = new Router({
  prefix: '/micro'
})

router.post('/powerball/add', async (ctx, next) => {
  let body = ctx.request.body
  if(!body.type) throw new global.customError.ServiceError('彩票类型不能为空')
  if(!body.code) throw new global.customError.ServiceError('彩票期数不能为空')
  await Powerball.saveBall(body)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0
  }
})

router.get(`/powerball/list`, async (ctx, next) => {
  let params = ctx.query
  if(!params.type) throw new global.customError.ServiceError('彩票类型不能为空')
  let res = await Powerball.getBallList(params)
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    list: res
  }
  return res
})

router.get(`/powerball/postzone`, async (ctx, next) => {
  let oneList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  let twoList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  let tip = createPostZone()
  tip.sort()
  let redList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                 '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
                 '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35']
  let redResult = []
  let createRedList = () => {
    let num = Math.floor(Math.random() * (35 - 1 + 1)) + 1
    if(redResult.find(e => e == num)){
      createRedList()
    }else{
      redResult.push(redList[num - 1])
      if(redResult.length < 5) createRedList()
    }
  }
  createRedList()
  redResult.sort()
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    data: `${redResult.join(' ')} + ${oneList[tip[0] - 1]} ${twoList[tip[1] - 1]}` 
  }
})

router.get(`/powerball/unionlotto`, async (ctx, next) => {
  let redList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                 '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
                 '25', '26', '27', '28', '29', '30', '31', '32', '33']
  let redResult = []
  let createRedList = () => {
    let num = Math.floor(Math.random() * (33 - 1 + 1)) + 1
    if(redResult.find(e => e == num)){
      createRedList()
    }else{
      redResult.push(redList[num - 1])
      if(redResult.length < 6) createRedList()
    }
  }
  createRedList()
  redResult.sort()
  let blueList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16']
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    data: `${redResult.join(' ')} + ${blueList[(Math.floor(Math.random() * (16 - 1 + 1)) + 1) - 1]}` 
  }
})

const createPostZone = () => {
  let a = Math.floor(Math.random() * (12 - 1 + 1)) + 1
  let b = Math.floor(Math.random() * (12 - 1 + 1)) + 1
  if(a != b) return [a, b]
  createPostZone()
}

module.exports = router