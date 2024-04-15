const axios = require('axios')
const dayjs = require('dayjs')

const configPath = `${process.cwd()}/config/config.js`
const config = require(configPath).ths

const accessToken = {
  token: '',
  time: ''
}

class AccessTokenManager{
  static async getAccessToken(){
    if(!accessToken.token || !accessToken.time || dayjs().diff(accessToken.time, 'day') > -1){
      let res = await AccessTokenManager.getAccessTokenFromThs()
      accessToken.token = res.access_token
      accessToken.time = res.expired_time
    }
    return accessToken.token
  }

  static async getAccessTokenFromThs(){
    let res = await axios.post('https://ft.10jqka.com.cn/api/v1/get_access_token', {
      refresh_token: config.refresh_token
    })
    if(res.status == 200 && res.data.errorcode == 0){
      return res.data.data
    }else{
      throw new global.customError.ServiceError(res.data.errmsg)
    }
  }
}

module.exports = {
  AccessTokenManager
}