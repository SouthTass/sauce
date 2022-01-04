const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const util = require('util')
const axios = require('axios')

class PerformanceForecast extends Model {
  static async getFirst(){
    return await PerformanceForecast.findOne({
      order: [
        ['id', 'DESC']
      ]
    })
  }

  static async createItem(code, name, type, time, float, profit, content){
    console.log(2, code, name, type, time, float, profit, content)
    return await PerformanceForecast.create({
      code, name, type, time, float, profit, content
    })
  }
}

PerformanceForecast.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  time: Sequelize.STRING,
  float: Sequelize.STRING,
  profit: Sequelize.STRING,
  content: Sequelize.STRING
}, {
  sequelize, tableName: 'performance_forecast'
})

module.exports = {
  PerformanceForecast
}