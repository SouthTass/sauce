const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class MainFunction extends Model {
  static async addOneItem(body){
    try {
      let res = await MainFunction.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async getOneItem(params){
    try {
      let res = await MainFunction.findOne({
        where: params
      })
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
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
  price: Sequelize.STRING,
  day_total_price: Sequelize.STRING,
  time: Sequelize.STRING,
}, {
  sequelize, tableName: 'stock_time_price'
}, {
  indexes: [{unique: true, fields: ['code']}]},
)

module.exports = {
  'StockTimePrice': MainFunction
}