const { sequelize } = require('../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('../models/favor')

class HotBook extends Model {
  static async getAll(){
    const books = await HotBook.findAll({
      order: [
        ['index']
      ]
    })
    if(!books) throw new global.customError.EmptyData()
    let ids = []
    books.map(e => ids.push(e.id))
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids,
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })
    if(favors.length < 1) throw new global.customError.EmptyData()
    books.map(e => {
      favors.map(f => {
        if(e.id == f.art_id){
          e.setDataValue('count', f.get('count'))
        }else{
          e.setDataValue('count', 0)
        }
      })
    })
    return books
  }

  static
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING,
}, {
  sequelize, tableName: 'hot_book'
})

module.exports = {
  HotBook
}