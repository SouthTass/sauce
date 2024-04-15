const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

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
      let query = JSON.parse(JSON.stringify(params))
      delete query.page_size
      let res = await MainFunction.findAll({
        where: query,
        order: [['time', 'DESC']],
        limit: Number(params.page_size)
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