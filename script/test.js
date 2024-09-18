const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

async function sendResearchRecord(bot){
  let res = await axios({
    url: 'https://appaplqmzzg4085.h5.xiaoeknow.com/_alive/bff_h5/msg/list',
    method: 'post',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      cookie: 'ko_token=21a76811f30bbb8fec3cd23b471b6ce7'
    },
    data: {
      "load_order":1,
      "info_type":0,
      "comment_id":"",
      "load_history":0,
      "size":20,
      "alive_id":"l_66c72b80e4b0d84dab1b221b",
      "room_id":"XET#2acad262e00c7d413",
      "app_id":"appaPlqmZZG4085"
    }
  })
  if(res.status == 200){
    let body = res.data.data.msgs
    if(!Array.isArray(body)){
      delay(10000)
      return
    }
    for(let i = 0; i < body.length; i++){
      let content = body[i].msg_content
      if(body[i].src_msg_content) {
        content += '\n------------------------------\n引用内容：'
        content += `${body[i].src_nick_name}：${body[i].src_msg_content}`
      }
      let result = await axios.get(`http://101.43.217.166:3000/api/wx/chat/record/first`, {
        params: {
          room_id: '24582332706@chatroom',
          content: content
        }
      })
      if(result.data.length < 1){
        await axios.post(`${configs.baseUrl}/wx/group/record`, {
          room: 'Jin言-VIP交流群', 
          name: body[i].wx_nickname, 
          content: content, 
          wxid: body[i].user_id,
          type: 'text',
          room_id: '24582332706@chatroom'
        })
      }
      delay(3000)
    }
  }
}

sendResearchRecord()