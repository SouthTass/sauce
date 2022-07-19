const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class MainFunction extends Model {
  static async addRecord(body){
    try {
      let res = await MainFunction.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async getRecord(code, type){
    let res = await MainFunction.findOne({
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
    let res = await MainFunction.findOne({
      where: body
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }

  static async updateRecords(code, type){
    let res = await MainFunction.update({
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

MainFunction.init({
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
  sequelize, tableName: 'stock_day_price'
})

module.exports = {
  'StockDayPrice': MainFunction
}