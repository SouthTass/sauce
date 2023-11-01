const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

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
    let where = { status: body.status }
    if(body.type){where.type = {[Op.in]: body.type.split(',')}}
    let res = await PerformanceForeshow.findOne({ where })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }

  static async updateRecords(code, type){
    let res = await PerformanceForeshow.update({
      status: 1
    },{
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