const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class PerformanceForeshow extends Model {
  static async addRecord(body){
    try {
      let res = await PerformanceForeshow.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async getRecord(code, type){
    let res = await PerformanceForeshow.findOne({
      where: {
        code, type
      }
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }

  static async getRecordStatus(body){
    let res = await PerformanceForeshow.findOne({
      where: body
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }
}
PerformanceForeshow.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  foreshow_type: Sequelize.STRING,
  content: Sequelize.STRING,
  float: Sequelize.STRING,
  profit: Sequelize.STRING,
  time: Sequelize.STRING,
  status: Sequelize.STRING,
  type: Sequelize.STRING
}, {
  sequelize, tableName: 'performance_foreshow'
})

module.exports = {
  PerformanceForeshow
}