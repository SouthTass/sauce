/**
 * 生成token令牌
 */
const jwt = require('jsonwebtoken')
const generateToken = function(uid, scope){
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign({ uid, scope }, secretKey, {
    expiresIn
  })
  return token
}

module.exports = {
  generateToken,
}