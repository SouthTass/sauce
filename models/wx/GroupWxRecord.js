const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class GroupWxRecord extends Model {
  static async saveRecord(room, from_name, content){
    return await GroupWxRecord.create({
      room, from_name, content
    })
  }
}

GroupWxRecord.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  room: Sequelize.STRING,
  content: Sequelize.TEXT,
  from_name: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'group_wx_record'
  }
)

module.exports = {
  GroupWxRecord
}