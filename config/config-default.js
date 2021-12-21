module.exports = {
  // 数据库配置
  dataBase: {
    dbname: '数据库名称',
    user: '数据库账号',
    pwd: '数据库密码',
    host: '数据库IP地址',
    port: '3306'
  },
  // jwt加密配置
  security: {
    secretKey: 'abcdefgh',
    expiresIn: 60 * 60 * 24 * 30
  },
  // 微信小程序配置
  wx: {
    appId: '微信appid',
    appSecret: '微信secret',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  // 鱼书第三方api配置
  yushu: {
    detailUrl: 'http://t.talelin.com/v2/book/id/%s',
    keywordUrl: 'http://t.talelin.com/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  }
}
