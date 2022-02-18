const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class IdleCapitalRecord extends Model {
  static async addRecord(body){
    try {
      let res = await IdleCapitalRecord.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }
}

IdleCapitalRecord.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  tag: Sequelize.STRING,
  source: Sequelize.STRING,
  time: Sequelize.DATE,
}, {
  sequelize, tableName: 'idle_capital_record'
})

module.exports = {
  IdleCapitalRecord
}