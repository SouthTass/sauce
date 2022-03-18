const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class FinancialRecord extends Model {
  // 增加清仓信息
  static async addItem(body){
    try {
      let res = await FinancialRecord.create(body)
      if(res) return res
    } catch (error) {
      throw new global.customError.ServiceError(error.message)
    }
  }

  static async getStat(){
    try {
      let result = {}

      // 获取盈亏总数
      let total = await FinancialRecord.sum('profit')
      result.total = total || 0

      // 获取盈利最多的个股
      let maxStock = await FinancialRecord.findOne({
        order: [
          ['profit', 'ASC']
        ]
      })
      result.max_stcok = maxStock || null

      // 获取盈利最少的个股
      let minStock = await FinancialRecord.findOne({
        order: [
          ['profit', 'DESC']
        ]
      })
      result.min_stcok = minStock || null

      // 获取每个个股的统计
      

      return result
    } catch (error) {
      throw new global.customError.ServiceError(error.message)
    }
  }
}

FinancialRecord.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  profit: Sequelize.STRING,
  sell_price: Sequelize.STRING,
}, {
  sequelize, tableName: 'financial_record'
})

module.exports = {
  FinancialRecord
}