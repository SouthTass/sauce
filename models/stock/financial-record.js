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

  // 获取统计信息
  static async getStat(){
    try {
      let result = {}
      let total = await FinancialRecord.sum('profit')
      result.total = Number(total).toFixed(2) || 0
      result.max_stcok = await getMaxProfitStock()
      result.min_stcok = await getMinProfitStock()
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


// 获取盈利最多的个股
async function getMaxProfitStock(){
  try {
    let res = await FinancialRecord.findOne({
      order: [[sequelize.cast(sequelize.col('profit'), 'SIGNED'), 'DESC']]
    })
    return res
  } catch (error) {
    throw new global.customError.ServiceError(error.message)
  }
}

// 获取盈利最少的个股
async function getMinProfitStock(){
  try {
    let res = await FinancialRecord.findOne({
      order: [[sequelize.cast(sequelize.col('profit'), 'SIGNED'), 'ASC']]
    })
    return res
  } catch (error) {
    throw new global.customError.ServiceError(error.message)
  }
}