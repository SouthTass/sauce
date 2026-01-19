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
  logging: false,
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
    deletedAt: 'deleted_at',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  }
})
sequelize.sync()
module.exports = {
  sequelize
}