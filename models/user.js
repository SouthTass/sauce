const bcrypt = require('bcryptjs')
const {sequelize} = require('../core/db')

const {Sequelize, Model} = require('sequelize')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword){
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(!user){
      throw new global.customError.AuthFailed('用户不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if(!correct){
      throw new global.customError.AuthFailed('密码不正确')
    }
    return user
  }

  static async getUserByOpenid(openid){
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }
  
  static async regiterUserByOpenid(openid){
    return await User.create({
      openid
    })
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nick_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val){
      this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(10)))
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
    sequelize,
    tableName: 'user'
  }
)

module.exports = {
  User
}