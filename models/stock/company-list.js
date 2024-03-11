const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Main extends Model {
  static async createItem(body){
    // return await Main.create(body[0])
  }

  // static async getList(params){
  //   return await Main.findAll({where: params})
  // }
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
    tableName: 'company_list'
  }
)

module.exports = {
  Company: Main
}