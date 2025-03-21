const axios = require('axios')
const dayjs = require('dayjs')

async function sendResearchRecord(){
  let res = await axios({
    // url: 'https://www.jiaoyikecha.com/ajax/variety_position.php?v=2522f36e',
    url: 'https://www.jiaoyikecha.com/ajax/variety_profit_loss.php?v=2522f36e',
    method: 'post',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      cookie: 'Hm_lvt_c54eb5f0c700b7d446674a77b06c4d24=1736586885; remember=6b455de8547fededf825d83a60b65319; Hm_lvt_82e02aae42734877305ee2d72ac6e6ad=1739754301,1740359418,1741093835,1741180642; HMACCOUNT=23A0A8D968410DF4; PHPSESSID=e9c905a6163ce925051ab2013d74e261; Hm_lpvt_82e02aae42734877305ee2d72ac6e6ad=1741596141'
    },
    data: {
      'variety': '豆油'
    }
  })
  console.log(res.data)
}

sendResearchRecord()

// async function 