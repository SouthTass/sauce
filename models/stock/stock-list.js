const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class StockList extends Model {
  static async addList(data){
    return await StockList.bulkCreate(data)
  }
}

StockList.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  float: Sequelize.STRING,
  price: Sequelize.STRING,
}, {
  sequelize, tableName: 'stock_list'
})

module.exports = {
  StockList
}