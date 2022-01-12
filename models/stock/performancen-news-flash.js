const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class PerformancenNewsFlash extends Model {
  static async getFirst(){
    return await PerformancenNewsFlash.findOne({
      order: [
        ['id', 'DESC']
      ]
    })
  }

  static async createItem(code, name, time, income, yesteryear_income, rate_income, chain_income, 
    profit, yesteryear_profit, rate_profit, chain_profit, earnings, property, yield_rate){
    return await PerformancenNewsFlash.create({
      code, name, time, income, yesteryear_income, rate_income, chain_income,
      profit, yesteryear_profit, rate_profit, chain_profit, earnings, property, yield_rate
    })
  }
}

PerformancenNewsFlash.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  time: Sequelize.STRING,
  income: Sequelize.STRING,
  yesteryear_income: Sequelize.STRING,
  rate_income: Sequelize.STRING,
  chain_income: Sequelize.STRING,
  profit: Sequelize.STRING,
  yesteryear_profit: Sequelize.STRING,
  rate_profit: Sequelize.STRING,
  chain_profit: Sequelize.STRING,
  earnings: Sequelize.STRING,
  property: Sequelize.STRING,
  yield_rate: Sequelize.STRING,
}, {
  sequelize, tableName: 'performancen_news_flash'
})

module.exports = {
  PerformancenNewsFlash
}