const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Main extends Model {
  static async add(body){
    try {
      let res = await Main.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async find(body){
    let res = await Main.findOne({
      where: body,
      order: [[ 'created_at', 'DESC' ]],
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }
}

Main.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: Sequelize.STRING,
  name: Sequelize.STRING,
  wx_id: Sequelize.STRING,
  wx_name: Sequelize.STRING,
  wx_room_id: Sequelize.STRING,
  wx_room_name: Sequelize.STRING,
  buy_price: Sequelize.STRING,
  sell_price: Sequelize.STRING,
  buy_time: Sequelize.STRING,
  sell_time: Sequelize.STRING
}, {
  sequelize, tableName: 'buy_and_sell'
})

module.exports = {
  BuyAndSell: Main
}