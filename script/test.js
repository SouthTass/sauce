const axios = require('axios')
const dayjs = require('dayjs')
const fs = require('fs')

async function sendResearchRecord(bot){
  let res = await axios({
    url: 'https://www.jiaoyikecha.com/ajax/variety_position.php?v=2522f36e',
    // https://www.jiaoyikecha.com/ajax/variety_profit_loss.php?v=2522f36e
    method: 'post',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      // cookie: 'ko_token=21a76811f30bbb8fec3cd23b471b6ce7'
    },
    // data: {
    //   "load_order":1,
    //   "info_type":0,
    //   "comment_id":"",
    //   "load_history":0,
    //   "size":20,
    //   "alive_id":"l_66c72b80e4b0d84dab1b221b",
    //   "room_id":"XET#2acad262e00c7d413",
    //   "app_id":"appaPlqmZZG4085"
    // }
  })
  console.log(res.data.data.buy)
}

sendResearchRecord()