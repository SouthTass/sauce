const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class StockNewsList extends Model {
  static async addList(data){
    let res = await StockNewsList.findOne({
      where: {
        nid: data.nid
      }
    })
    if(res){
      return {
        code: 1,
        message: '数据已存在'
      }
    }else{
      return await StockNewsList.create(data)
    }
  }

  static async getItemInfo(nid){
    let res = await StockNewsList.findOne({
      where: {
        nid: nid
      }
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }

  static async getLastItem(){
    let res = await StockNewsList.findOne({
      where: {
        status: 0
      }
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }

  static async updateItem(nid){
    let res = await StockNewsList.update({
      status: 1
    },{
      where: {
        nid: nid,
      }
    })
    if(res){
      return res
    }else{
      throw new global.customError.EmptyData()
    }
  }
}

StockNewsList.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nid: Sequelize.STRING,
  title: Sequelize.STRING,
  digest: Sequelize.STRING,
  status: Sequelize.STRING,
}, {
  sequelize, tableName: 'stock_news_list'
})

module.exports = {
  StockNewsList
}