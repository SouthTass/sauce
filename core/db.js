const SequeLize = require('sequelize')
const {
  dbname,
  user,
  pwd,
  host,
  port
} = require('../config/config').dataBase

const sequelize = new SequeLize(dbname, user, pwd, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  },
  define: {
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
})
sequelize.sync()
module.exports = {
  sequelize
}