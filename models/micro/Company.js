const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class Main extends Model {
  static async createItem(body){
    return await Main.create(body)
  }

  static async getList(params){
    return await Main.findAll({where: params})
  }
}

Main.init({
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
  'Company': Main
}