const axios = require('axios')
const dayjs = require('dayjs')

let hzycMessageList = []
async function sendResearchRecord(){
  let res = await axios({
    url: 'https://qh-flash-api.jin10.com/get_flash_list?channel=-1',
    method: 'get',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'x-app-id': 'KxBcVoDHStE6CUkQ',
      'x-version': '1.0.0'
   },
  })
  if(res.status != 200) return console.log(`查询金十期货数据出错，状态码：${res.status}`)
  if(res.data.status != 200) return console.log(`查询金十期货数据出错，内部状态码：${res.data.status}，错误消息：${res.data.message}`)
  let list = res.data.data
  

  
  
  console.log(list)
  // if(res.data.status != 200) return
  // let data = res.data.data[0]
  // if(!data) return
  // let item = hzycMessageList.find(e => e.id == data.id)
  // if(!item){
  //   hzycMessageList.push(data)
  //   console.log(data.content)
  //   // let roomList = ['19698830634@chatroom']
  //   // for(let i = 0; i < roomList.length; i++){
  //   //   const room = await bot.Room.find({id: roomList[i]})
  //   //   if(room) await room.say(data.content)
  //   // }
  // }
}

sendResearchRecord()