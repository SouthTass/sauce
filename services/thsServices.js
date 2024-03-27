const axios = require('axios')
const dayjs = require('dayjs')
const thsConfig = global.config.ths

const accessToken = {
  token: '',
  time: ''
}

class AccessTokenManager{
  static async getAccessToken(){
    if(!accessToken.token || !accessToken.time || dayjs().diff(accessToken.time, 'day') > 6){
      accessToken = await getAccessTokenFromThs()
    }
    return accessToken
  }

  static async getAccessTokenFromThs(){
    let res = await axios.post('https://ft.10jqka.com.cn/api/v1/get_access_token', {
      refresh_token: thsConfig.refresh_token
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