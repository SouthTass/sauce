const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class MainService extends Model {
  static async addOneItem(body){
    try {
      let res = await MainService.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }
}

MainService.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  code_name: Sequelize.STRING,
  add_price: Sequelize.STRING,
  add_time: Sequelize.STRING,
  exit_price: Sequelize.STRING,
  exit_time: Sequelize.STRING,
  add_user_id: Sequelize.STRING,
  add_user_name: Sequelize.STRING,
  add_room_id: Sequelize.STRING,
  add_room_name: Sequelize.STRING,
  word: Sequelize.STRING,
  real_num: Sequelize.STRING,
  exit_num: Sequelize.STRING
}, {
  sequelize, tableName: 'stock_space'
})

module.exports = {
  Program: MainService
}