const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

async function getList(index){
  let res = await axios.get(`https://aiqicha.baidu.com/s/advanceFilterAjax?q=%E5%8C%97%E4%BA%AC%E5%AE%A0%E7%89%A9&t=&p=${index}&s=20&o=20&f=%7B%7D`, {
    headers: {
      Referer: 'https://aiqicha.baidu.com/s?q=%E5%8C%97%E4%BA%AC%E5%AE%A0%E7%89%A9&t=0',
      Accept: 'text/html; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Cookie: 'BIDUPSID=EB581D9A22A264A45425EF520E941CD2; PSTM=1687834881; BAIDUID=EB581D9A22A264A4BFE6F10896ED4E00:FG=1; log_guid=29a8ba3ed08b74bcdfd318fe7d810870; _j47_ka8_=57; BDUSS_BFESS=5wU3pPaDNBWXVPQlpnck9QeENrQ35iVWZVaX52bmJCUjJoM3VtU3M1UXhaQVptRVFBQUFBJCQAAAAAAQAAAAEAAABbDLWEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADHX3mUx195lcW; MCITY=-131%3A; H_WISE_SIDS_BFESS=40171_40200_40079_40210_40207_40217_40222_40059_40266_40273_40295_40290_40289_40285; H_WISE_SIDS=40171_40210_40207_40217_40222_40059_40273_40295_40290_40289_40285_40317_40079_40364_40352_40304_40368_40374; H_PS_PSSID=40171_40210_40207_40217_40222_40273_40295_40290_40289_40285_40317_40079_40364_40352_40304_40368_40374; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BA_HECTOR=2l0h2la004a4al0l0ka1a02hb5b8mr1iusp191s; ZFY=O:AooXD2V8XlKSFXtm5VPQnzVXjZCgsR:BmtvqO2P2oOs:C; BAIDUID_BFESS=EB581D9A22A264A4BFE6F10896ED4E00:FG=1; PSINO=2; BDPPN=67b86befc6466fd55969b36750138718; login_type=passport; _t4z_qc8_=xlTM-TogKuTw5gxYlPT6R1eYLUV-JONFfQmd; Hm_lvt_ad52b306e1ae4557f5d3534cce8f8bbf=1709014460,1710123354; delPer=0; log_first_time=1710127975509; entry=4104; _fb537_=xlTM-TogKuTw5vPIVS8p4xggLYoKqRvx7PlhXM4CIhn1md; ab171012600=42551f432e6d0128f4c63be9492d97e217101282235a6; Hm_lpvt_ad52b306e1ae4557f5d3534cce8f8bbf=1710128224; ab_sr=1.0.1_MWQ1ZmY0ZDk4NWIyODIyM2MzYWZmNjM5MDdhOGMxMjMwYzczYzE3YmE1ZmMxY2QwZTU0YjE3NTdlYmZjMTMzNDdkN2NlNGZmMzYwMGRiMDgzNWY4YzEwMDc5NGJmZjVkYTJkMzQwZWRkZTgzN2E0MjVjZWYzNjkwODJjM2NhMTk4MmRmYjdmZDI1Zjg5N2YyYmEyZTc3NWFhNDYwMTdkMw==; _s53_d91_=c30e4d3511dc5806705d4c78117bf100aa0952db873cd7126058b772385a0a0deec393b7047b01d303c69996bdec81c9efcccc0a46425955739336f3becc758cba89ea8970acf0326cc0028a85d4880d13c76811668f43a78f823ff72ea8c5b79a8e1bee447c4340cf7498fe51e908a8427bc19e3bc445a787c9a2cb512b48992642efb767f41ff321e29992dee05d5a924bc6051f698b29c44512d0643733d937b0e0a011cd691050322c6a9ee305bc178a322db032518ced875d0a218ec9c049a75dedfb93b9c3dd48a59b7ff416ed; _y18_s21_=0720d0b8; RT="z=1&dm=baidu.com&si=ec5b59ad-4050-42ed-be58-3ae65221476e&ss=ltme1hey&sl=b&tt=eot&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=b0hi&nu=9y8m6cy&cl=b2iw"; log_last_time=1710128490056'
    },
  })
  return res.data.data.resultList
}
// 379
(async () => {for(let i = 1; i < 379; i++){
  let res = await getList()
  let list = []
  res.map(e => {
    list.push({
      name: e.titleName,
      tel: e.telephone,
      address: e.titleDomicile
    })
  })
  await axios.post(`http://localhost:3000/micro/company/add`, list)
}
})()