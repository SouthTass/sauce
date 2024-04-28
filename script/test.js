const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

async function getList(index){
  let res = await axios.get(`https://aiqicha.baidu.com/s/advanceFilterAjax?q=%E5%94%90%E5%B1%B1%E5%AE%A0%E7%89%A9&t=&p=${index}&s=20&o=20&f=%7B%7D`, {
    headers: {
      Referer: 'https://aiqicha.baidu.com/s?q=%E5%94%90%E5%B1%B1%E5%AE%A0%E7%89%A9&t=0',
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Cookie: 'BIDUPSID=EB581D9A22A264A45425EF520E941CD2; PSTM=1687834881; BAIDUID=EB581D9A22A264A4BFE6F10896ED4E00:FG=1; log_guid=29a8ba3ed08b74bcdfd318fe7d810870; _j47_ka8_=57; BDUSS_BFESS=5wU3pPaDNBWXVPQlpnck9QeENrQ35iVWZVaX52bmJCUjJoM3VtU3M1UXhaQVptRVFBQUFBJCQAAAAAAQAAAAEAAABbDLWEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADHX3mUx195lcW; BDPPN=67b86befc6466fd55969b36750138718; H_WISE_SIDS_BFESS=40171_40210_40207_40217_40222_40273_40295_40290_40289_40285_40317_40079_40364_40352_40304_40368_40374; H_PS_PSSID=40171_40304_40368_40374_40416_40459_40480_40510_40513_40398_40446_60044_60023_60048; H_WISE_SIDS=40171_40304_40368_40374_40416_40459_40480_40510_40513_40398_40446_60044_60023_60048; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; MCITY=-131%3A; BAIDUID_BFESS=EB581D9A22A264A4BFE6F10896ED4E00:FG=1; PSINO=2; delPer=0; BA_HECTOR=agakah808k8la08l21ak21a0judqbq1j1cgfd1t; ZFY=O:AooXD2V8XlKSFXtm5VPQnzVXjZCgsR:BmtvqO2P2oOs:C; login_type=passport; Hm_lvt_ad52b306e1ae4557f5d3534cce8f8bbf=1711949511,1712813154; log_first_time=1712813153969; fromPath=/; __bid_n=18ecb9fc95b87366076544; _t4z_qc8_=xlTM-TogKuTw5gxYlPT6R1eYLUV-JONFfQmd; ab171281160=a6ca0b0653f7cba55a87800da265d2481712813513921; Hm_lpvt_ad52b306e1ae4557f5d3534cce8f8bbf=1712813514; ab_sr=1.0.1_YWVhMjRhYWM1NTQzM2I4MjIyOTYzZmMxZjljY2Y3N2UyNTBmYTVjZDdlNWE2ZWEzMTQwMjE5ZmI1NGRmODZjODJjZTBlMjA3YWJkYTdhNmJhMzJhNGY5NDcwNmY4YWFmMDg3MDU5MDYxMGI5NjMxMDRkMGI4M2ZmZjhhYzY5N2YzYmQ1NzkzMzZmZGVlMDgyOWVhYTE0ZDgwZTczNzY0YQ==; _s53_d91_=c30e4d3511dc5806705d4c78117bf100aa0952db873cd7126058b772385a0a0deec393b7047b01d303c69996bdec81c9efcccc0a46425955739336f3becc758cba89ea8970acf0326cc0028a85d4880d13c76811668f43a78f823ff72ea8c5b79a8e1bee447c4340cf7498fe51e908a8427bc19e3bc445a787c9a2cb512b48992642efb767f41ff321e29992dee05d5a924bc6051f698b29c44512d0643733d937b0e0a011cd691050322c6a9ee305bca7e1a4f4c2e84a29b088b7d38f4d1f03d6abd90ecb46e199d47de801775aea67; _y18_s21_=128fef93; RT="z=1&dm=baidu.com&si=04c6882e-3de0-4088-9f58-e7320deab6dc&ss=luusq5jb&sl=5&tt=bbl&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=7u56&nu=9y8m6cy&cl=89h5"; log_last_time=1712813536386'
    },
  })
  return res.data.data.resultList
}
// 379
(async () => {for(let i = 1; i < 98; i++){
  let res = await getList()
  let list = []
  res.map(e => {
    list.push({
      name: e.titleName,
      tel: e.telephone,
      address: e.titleDomicile
    })
  })
  console.log(i)
  await axios.post(`http://localhost:3000/api/micro/company/add`, list)
}
})()