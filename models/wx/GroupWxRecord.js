const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class GroupWxRecord extends Model {
  static async saveRecord(room, from_name, content){
    return await GroupWxRecord.create({
      room, from_name, content
    })
  }

  static async getChatNum(){
    let list = await GroupWxRecord.count({
      where: {
        room: '4000'
      },
      attributes: ['from_name'],
      group: 'from_name'
    })
    if(!list) throw new global.customError.ServiceError('暂无记录')
    return list
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