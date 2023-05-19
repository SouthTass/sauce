const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class Main extends Model {
  static async saveBall(body){
    return await Main.create(body)
  }

  static async getBallList(params){
    return await Main.findAll({where: params})
  }
}

Main.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  type: Sequelize.STRING,
  ball0: Sequelize.STRING,
  ball1: Sequelize.STRING,
  ball2: Sequelize.STRING,
  ball3: Sequelize.STRING,
  ball4: Sequelize.STRING,
  ball5: Sequelize.STRING,
  ball6: Sequelize.STRING,
  open_prize_date: Sequelize.STRING
}, {
    sequelize,
    tableName: 'powerball',
    indexes: [
      { 
        unique: false, 
        fields: ['id'] 
      },
      { 
        unique: false, 
        fields: ['code'] 
      }
    ]
  }
)

module.exports = {
  'Powerball': Main
}