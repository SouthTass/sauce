const axios = require('axios')
const util = require('util')
const { User } = require('../models/user')
const { generateToken } = require('../core/util')


class AccessTokenManager{
  static async getToken(){

  }
  
  static async setToken(){

  }

  static async updateToken(){

  }

  static async getTokenFromWx(){

  }

  static async codeToToken(code){
    const wx = global.config.wx
    const url = util.format(wx.loginUrl, wx.appId, wx.appSecret, code)
    const res = await axios.get(url)
    if(res.status !== 200){
      throw new global.customError.AuthFailed('openid获取失败')
    }
    if(res.data.errcode){
      throw new global.customError.AuthFailed(`openid获取失败：${res.data.errcode}--${res.data.errmsg}`)
    }
    let user = await User.getUserByOpenid(res.data.openid)
    console.log(300, user)
    if(!user){
      user = await User.regiterUserByOpenid(res.data.openid)
    }
    return generateToken(user.id, 2)
  }
}

module.exports = {
  AccessTokenManager
}