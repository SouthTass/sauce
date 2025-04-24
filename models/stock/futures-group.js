const { sequelize } = require('../../core/db')
const { Sequelize, Model, where } = require('sequelize')

class MainFunction extends Model {
  static async createItem(body){
    try {
      let res = await MainFunction.create(body)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async updateItem(body){
    try {
      let res = await MainFunction.update(body, {
        where: {
          id: body.id
        }
      })
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  static async getItem(params){
    try {
      let res = await MainFunction.findAll(params)
      if(res) return res
    } catch (error) {
      return `${error.name} - ${error.parent.sqlMessage}`
    }
  }

  
  // static async updateItem(body){
  //   try {
  //     let obj = await Main.findOne({
  //       where: {
  //         wx_id: body.wx_id,
  //         wx_room_id: body.wx_room_id,
  //         key_word: body.key_word
  //       }
  //     })
  //     if(obj){
  //       let res = await Main.update({ content: body.content }, {
  //         where: {
  //           wx_id: body.wx_id,
  //           wx_room_id: body.wx_room_id,
  //           key_word: body.key_word
  //         }
  //       })
  //       if(res) return res
  //     }else{
  //       let res = await Main.create(body)
  //       if(res) return res
  //     }
  //   } catch (error) {
  //     return `${error.name} - ${error.parent.sqlMessage}`
  //   }
  // }
  
}

MainFunction.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  parent: Sequelize.STRING,
  type: Sequelize.STRING,
  name: Sequelize.STRING,
  price: Sequelize.STRING,
  number: Sequelize.STRING,
  status: Sequelize.STRING,
  user_id: Sequelize.STRING,
  user_name: Sequelize.STRING
}, {
  sequelize, tableName: 'user_futures_group'
})

module.exports = {
  'FuturesGroup': MainFunction
}