const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager{
  static initCore(app){
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.importGlobalError()
    InitManager.loadConfig()
    if(process.env.USER != 'wzt') InitManager.timedTask()
  }

  static loadConfig(path = ''){
    const configPath = path || `${process.cwd()}/config/config.js`
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters(){
    const wxDirectory = `${process.cwd()}/app/wx`
    requireDirectory(module, wxDirectory, {
      visit: whenLoadModule
    })

    const toolsDirectory = `${process.cwd()}/app/tools`
    requireDirectory(module, toolsDirectory, {
      visit: whenLoadModule
    })

    const stockDirectory = `${process.cwd()}/app/stock`
    requireDirectory(module, stockDirectory, {
      visit: whenLoadModule
    })

    const microDirectory = `${process.cwd()}/app/micro`
    requireDirectory(module, microDirectory, {
      visit: whenLoadModule
    })
    
    function whenLoadModule(obj){
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
  }

  static importGlobalError(){
    const errorFile = require('../core/httpException')
    global.customError = errorFile
  }

  static timedTask(){
    const taskPath = `${process.cwd()}/script/task/index.js`
    const task = require(taskPath)
    task.init()
  }
}

module.exports = InitManager