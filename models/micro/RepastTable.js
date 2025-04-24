const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class MainService extends Model {
  static async createTable(body){
    try {
      return await MainService.bulkCreate(body)
    } catch (error) {
      console.log(error)
    }
  }

  static async getList(params){
    return await MainService.findAll({where: params})
  }
}

MainService.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: Sequelize.STRING,
  room_id: Sequelize.STRING,
  room_name: Sequelize.STRING,
  user_id: Sequelize.STRING,
  user_name:  Sequelize.STRING
}, {
    sequelize,
    tableName: 'repast_table'
  }
)

module.exports = {
  'RepastTable': MainService
}