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

  static async getOneItemInCurrentTime(params){
    try {
      let res = await MainFunction.findOne({
        where: {
          code: params.code,
          time: {
            [Op.between]: [
              dayjs(params.start).format('YYYY-MM-DD HH:mm:00'),
              dayjs(params.end).format('YYYY-MM-DD HH:mm:59')
            ]
          }
        },
        order: [
          ['time', 'DESC']
        ]
      })
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }
}

// MainFunction.init({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   code: Sequelize.STRING,
//   name: Sequelize.STRING,
//   price: Sequelize.STRING,
//   day_total_price: Sequelize.STRING,
//   time: Sequelize.STRING,
// }, {
//   sequelize, tableName: 'stock_time_price'
// }, {
//   indexes: [{unique: true, fields: ['code']}]},
// )

module.exports = {
  'StockTimePrice': MainFunction
}