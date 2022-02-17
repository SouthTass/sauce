class httpException extends Error {
  constructor(message, status){
    super()
    this.message = message
    this.status = status
  }
}

// 请求成功
class Success extends httpException {
  constructor(message){
    super()
    this.message = message || '成功'
    this.status = 200
  }
}

// 查询到的数据为空或者是代表不用返回数据
class EmptyData extends httpException {
  constructor(message){
    super()
    this.message = message || '请求成功'
    this.status = 204
  }
}

// 收到请求了，但是缺少东西等等
class ServiceError extends httpException {
  constructor(message){
    super()
    this.message = message || '服务错误'
    this.status = 400
  }
}

// 请求的时候没有授权信息
class AuthFailed extends httpException {
  constructor(message){
    super()
    this.message = message || '非法用户'
    this.status = 403
  }
}

module.exports = {
  httpException,
  Success,
  AuthFailed,
  EmptyData,
  ServiceError
}