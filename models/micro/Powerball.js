const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class Main extends Model {
  static async saveBall(body){
    console.log(body)
    return await Main.create(body)
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
  ball6: Sequelize.STRING
}, {
    sequelize,
    tableName: 'powerball'
  }
)

module.exports = {
  'Powerball': Main
}