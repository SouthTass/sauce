const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFileds = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
}

class Movie extends Model {

}

Movie.init(classicFileds, {
  sequelize, tableName: 'movie'
})

class Sentence extends Model {

}

Sentence.init(classicFileds, {
  sequelize, tableName: 'sentence'
})

class Music extends Model {

}

Music.init({url: Sequelize.STRING, ...classicFileds}, {
  sequelize, tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}