class httpException extends Error {
  constructor(message, status, code){
    super()
    this.message = message
    this.status = status
    this.code = code
  }
}

class NotFound extends httpException {
  constructor(message, code){
    super()
    this.message = message || '找不到资源'
    this.code = code || 404
    this.status = 404
  }
}

class Success extends httpException {
  constructor(message, code){
    super()
    this.message = message || '成功'
    this.code = code || 0
    this.status = 201
  }
}

class AuthFailed extends httpException {
  constructor(message, code){
    super()
    this.message = message || '成功'
    this.code = code || 400
    this.status = 400
  }
}

class Forbbiden extends httpException {
  constructor(message, code){
    super()
    this.message = message || '禁止访问'
    this.code = code || 403
    this.status = 403
  }
}

class BusinessError extends httpException {
  constructor(message, code){
    super()
    this.message = message || '业务错误'
    this.code = code || 400
    this.status = 400
  }
}

class EmptyData extends httpException {
  constructor(message, code){
    super()
    this.message = message || '暂无数据'
    this.status = 200
    this.code = code || 0
  }
}

class ServiceError extends httpException {
  constructor(message, code){
    super()
    this.message = message || '服务错误'
    this.code = code || 400
    this.status = 400
  }
}

module.exports = {
  httpException,
  NotFound,
  Success,
  AuthFailed,
  Forbbiden,
  BusinessError,
  EmptyData,
  ServiceError
}