const axios = require('axios')
const dayjs = require('dayjs')
const baseFileName = 'wblist'

async function sendResearchRecord(){
  let res = await axios({
    url: 'https://weibo.com/ajax/statuses/mymblog?uid=8445157171&page=1&feature=0',
    method: 'get',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'client-version': 'v1.1.238',
      'referer': `https://weibo.com/u/8445157171`,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
      'accept-encoding': 'gzip, deflate, br',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not=A?Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'cookie': 'SCF=AkTTrKjtW4GM-q43gx_hGtJODp4wnMgZYu160yuP2K3hMQgZQYiF-7La6VooJdwvHufnEdJqrTxq7nI_OtRZ2HI.; SINAGLOBAL=9011150496730.748.1776085285881; XSRF-TOKEN=qU9YWYMPLfaMQitTyG21uNwO; _s_tentry=weibo.com; Apache=5608926065971.555.1782113870680; ULV=1782113870681:5:1:1:5608926065971.555.1782113870680:1778593162984; ALF=1789089718; SUB=_2A25Hf7rmDeRhGeVP71cR8C_Pwj6IHXVk9LIurDV8PUJbkNANLRftkW1NTOlysQR3EeX97FQF1P6TtK5gg5lsht2I; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whq3OIVDWJDaiKMrYkmloDb5JpX5KMhUgL.FoepSh-7eh201Kz2dJLoIpjLxK.LBKeL12-LxKnL1h2L1hqLxK.L1KnL1h2t; WBPSESS=x9sktLuBZH_fgU8R4_ckEOBvPMyWgZIko9vxCI8yeI7NyUog4AvCH0gi5J6UwUQ6r7YIIT0koR2EkCRTOnV3YgAS4UNgMvtawh4YYPgc3YLrvDYOj22zazWWd073-QsqqGl1A-nVoMoL522UKBgRHA=='
   },

   
  })
  
  if(res.status != 200) return console.log('微博查询出错')
  let data = res.data.data.list[0]
  if(!data) return
  console.log('微博查询查询成功', data.id)

  let messageList = JSON.parse(fs.readFileSync(`${process.cwd()}/config/${baseFileName}.json`, 'utf8'))
  let item = messageList.find(e => e.id == data.id)
  if(!item){
    messageList.push({id: data.id})
    fs.writeFileSync(`${process.cwd()}/config/${baseFileName}.json`, JSON.stringify(messageList))
    let text = ['【微博-金昕】']
    text.push(dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss'))
    text.push(data.text.replace(/<[^>]+>/g, ''))
    let userList = ['woxinfeixiangdeg']
    for(let i = 0; i < userList.length; i++){
      let contact = await bot.Contact.find({id: userList[i]})
      if(contact) contact.say(text.join('\n'))
    }
  }
}

sendResearchRecord()