const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class MainService extends Model {
  static async createItem(body){
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
  name: Sequelize.STRING,
  tel: Sequelize.STRING,
  address: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'company'
  }
)

module.exports = {
  'Company': MainService
}