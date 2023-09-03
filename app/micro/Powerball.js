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

// 获取双色球匹配度
router.get(`/powerball/ssq`, async (ctx, next) => {
  let params = ctx.query
  if(!params.type) throw new global.customError.ServiceError('彩票类型不能为空')
  if(!params.number) throw new global.customError.ServiceError('彩票号码不能为空')
  let arr = ''
  try {
    arr = params.number.split(' ')
  } catch (error) {
    throw new global.customError.ServiceError('彩票号码有误')
  }
  if(arr.length != 7) throw new global.customError.ServiceError('彩票号码有误')
  let res = await Powerball.getBallList({type: params.type})
  if(!res) throw new global.customError.ServiceError('服务有误，请稍后再试')
  if(res.length < 1){
    ctx.status = 200
    ctx.body = res
    return
  }
  let result = []
  res.map(e => {
    let i = 0
    arr.map(item => {
      if(e.ball0 == item) i++
    })
    e.conform = i
    if(e.conform > 0) result.push(e)
  })

  ctx.status = 200
  ctx.body = result
})

router.post('/answer', async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    message: 'ok',
    code: 0,
    data: {
      "analysis_result": "根据提供的检索资料和新闻描述，可以得出以下结论：\n\n根据检索到的报道，福原爱因为争夺儿子的抚养权而面临失去所有收入的困境，损失至少上亿日元。如果她的前夫江宏杰对她提起刑事诉讼，她可能会面临国际通缉的危险。新闻描述中没有提及福原爱移民到新加坡的情况，而根据澎湃新闻的报道，日本媒体怀疑福原爱已经移民到新加坡。\n\n综合以上信息，可以认为新闻描述基本准确。据报道，福原爱确实因为争夺儿子的抚养权而面临失去所有收入的困境，失去的金额至少上亿日元。然而，新闻描述未提及福原爱移民到新加坡的情况，这一信息可能需要进一步核实。\n\n需要说明的是，除了提供的检索资料外，没有找到更多的相关报道来支持或否认福原爱移民到新加坡的说法。因此，对于福原爱移民的情况，需要进一步的调查和证实。",
      "references": {
          "Chinese": [
              {
                  "reference id": "1",
                  "source": "ZAKER资讯",
                  "date": "3天前",
                  "title": "日媒曝福原爱或将面临国际通缉",
                  "link": "http://app.myzaker.com/article/64db3e1a1bc8e03b4c000011"
              },
              {
                  "reference id": "2",
                  "source": "ZAKER资讯",
                  "date": "前天14:52",
                  "title": "竟然走到这一步了?",
                  "link": "http://app.myzaker.com/news/article.php?pk=64dc72118e9f09741347cde1"
              },
              {
                  "reference id": "3",
                  "source": "和讯网",
                  "date": "3天前",
                  "title": "日媒曝福原爱或将面临国际通缉,因争夺儿子抚养权损失至少上亿日元",
                  "link": "http://stock.hexun.com/2023-08-15/209698106.html"
              },
              {
                  "reference id": "4",
                  "source": "澎湃新闻",
                  "date": "昨天13:14",
                  "title": "冲上热搜,福原爱或将面临国际通缉",
                  "link": "https://www.thepaper.cn/newsDetail_forward_24250950?commTag=true"
              }
          ],
          "English": [
              {
                  "reference id": "1",
                  "source": null,
                  "date": "Apr 25, 2023",
                  "title": "Ai Fukuhara's “return to TV after a long absence…but now ...",
                  "link": "https://en.friday.news/article/16318?page=1"
              },
              {
                  "reference id": "2",
                  "source": null,
                  "date": "Jul 28, 2023",
                  "title": "Ex-husband of retired table tennis star Ai Fukuhara seeks ...",
                  "link": "https://english.kyodonews.net/news/2023/07/5334b09dbf2a-ex-husband-of-retired-table-tennis-star-fukuhara-seeks-return-of-son.html"
              },
              {
                  "reference id": "3",
                  "source": null,
                  "date": "Jul 27, 2023",
                  "title": "In Japan, which bans dual custody, a table tennis star ...",
                  "link": "https://apnews.com/article/japan-taiwan-fukuhara-chiang-child-custody-divorce-117cf86befefa59ccfe7b11acb16f051"
              },
              {
                  "reference id": "4",
                  "source": null,
                  "date": "Jul 28, 2023",
                  "title": "Ex-Husband of Table Tennis Star Ai Fukuhara Accuses Her ...",
                  "link": "https://www.tokyoweekender.com/japan-life/news-and-opinion/ai-fukuhara-accused-of-abducting-son/"
              }
          ]
      }
    }
  }
})

module.exports = router