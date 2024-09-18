const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Main extends Model {
  static async addGroup(body){
    try {
      let obj = await Main.findOne({
        where: {
          wx_id: body.wx_id,
          wx_room_id: body.wx_room_id,
          key_word: body.key_word
        }
      })
      if(obj){
        let res = await Main.update({ content: body.content }, {
          where: {
            wx_id: body.wx_id,
            wx_room_id: body.wx_room_id,
            key_word: body.key_word
          }
        })
        if(res) return res
      }else{
        let res = await Main.create(body)
        if(res) return res
      }
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async getOneGroup(body){
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

  static async updateGroup(body){
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

  static async updateGroup(body){
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
  wx_id: Sequelize.STRING,
  wx_name: Sequelize.STRING,
  wx_room_id: Sequelize.STRING,
  wx_room_name: Sequelize.STRING,
  key_word: Sequelize.STRING,
  content: Sequelize.STRING,
}, {
  sequelize, tableName: 'user_stock_group'
})

module.exports = {
  Group: Main
}