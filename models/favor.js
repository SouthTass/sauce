const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('../models/art')

class Favor extends Model {
  static async like(art_id, type, uid){
    const favor = await Favor.findOne({
      where: {
        art_id, type, uid
      }
    })
    if(favor){
      throw new global.customError.BusinessError('你已经点过赞了，请不要重复点赞')
    }
    try {
      const result = await sequelize.transaction(async (t) => {
        await Favor.create({
          art_id, type, uid
        }, { transaction: t });
        const art = await Art.getData(art_id, type)
        await art.increment('fav_nums', { by: 1, transaction: t})
      })
      return art
    } catch (error) {  
    }
  }

  static async dislike(art_id, type, uid){
    const favor = await Favor.findOne({
      where: {
        art_id, type, uid
      }
    })
    
    if(!favor){
      throw new global.customError.BusinessError('你还没有点过赞，快去点赞吧')
    }
    try {
      await sequelize.transaction(async (t) => {
        await favor.destroy({
          force: true
        }, { transaction: t })
        const art = await Art.getData(art_id, type)
        await art.decrement('fav_nums', { by: 1, transaction: t})
      })
      return art
    } catch (error) {  
    }
  }

  static async userLikeStatus(art_id, type, uid){
    const res = await Favor.findOne({
      where: {
        art_id, type, uid
      }
    })
    if(res){
      return true
    }else{
      return false
    }
  }

  static async referFavorItem(art_id, type, index){
    const art = await Art.getData(art_id, type)
    const status = await Favor.userLikeStatus(art_id, type, 3)
    art.setDataValue('index', index)
    art.setDataValue('like_status', status)
    return art
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}