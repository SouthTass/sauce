const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const dayjs = require('dayjs')

class MainFunction extends Model {
  static async addOneItem(body){
    try {
      let res = await MainFunction.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async getList(params){
    try {
      let res = await MainFunction.findOne({
        where: params
      })
      if(res) return res
      return []
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
  height: Sequelize.STRING,
  time: Sequelize.STRING
}, {
  sequelize, tableName: 'stock_board_ladder'
})

module.exports = {
  'StockBoardLadder': MainFunction
}