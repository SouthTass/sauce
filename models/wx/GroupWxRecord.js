const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class GroupWxRecord extends Model {
  static async saveRecord(room, from_name, content, wxid, type, record_at, room_id){
    return await GroupWxRecord.create({
      room, from_name, content, wxid, type, record_at, room_id: room_id || ''
    })
  }

  static async getChatNum(){
    let list = await GroupWxRecord.count({
      attributes: ['from_name'],
      group: 'from_name',
      where: {
        'room_id': '39062224312@chatroom'
      }
    })
    if(!list) throw new global.customError.ServiceError('暂无记录')
    console.log(list.sort((a, b) => b.count - a.count))
    return list
  }

  static async getChatRecord(params){
    let where = {
      created_at: {
        [Op.between]: [params.start_time, params.end_time]
      },
      ...params
    }
    delete where.start_time
    delete where.end_time
    let list = await GroupWxRecord.findAll({
      where,
      order: [[ 'created_at', 'DESC' ]]
    })
    if(!list) throw new global.customError.ServiceError('暂无记录')
    return list
  }

  static async getChatUser(room){
    let list = await GroupWxRecord.findAll({
      where: {
        room,
      },
      group: 'from_name',
      attributes: ['from_name']
    })
    if(!list) throw new global.customError.ServiceError('暂无记录')
    return list
  }

  static async getChatUserXi(room){
    let list = await GroupWxRecord.findAll({
      // where: {
      //   room: '反孟机动小分队'
      // },
      attributes: ['from_name', 'wxid', 'id']
    })
    let num = list.length
    for(let i = 0; i < num; i++){
      if(list[i].wxid) continue
      let index = list.findIndex(e => (e.from_name == list[i].from_name) && e.wxid)
      if(index == -1) continue
      await GroupWxRecord.update({
        wxid: list[index].wxid
      }, {
        where: {
          id: list[i].id
        }
      })
      console.log('成功')
      if(i + 1 >= num) console.log('结束')
    }
  }

  static async getFirstChatRecord(params){
    let list = await GroupWxRecord.findOne({
      where: {
        ...params
      },
      order: [[ 'created_at', 'DESC' ]]
    })
    if(!list){
      return []
    }
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
  room_id: Sequelize.STRING,
  content: Sequelize.TEXT,
  from_name: Sequelize.STRING,
  wxid: Sequelize.STRING,
  type: Sequelize.STRING,
  record_at: Sequelize.STRING
}, {
    sequelize,
    tableName: 'group_wx_record'
  }
)

module.exports = {
  GroupWxRecord
}