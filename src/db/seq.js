// sequelize 实例

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const config = {
  // 端口号
  host,
  // 数据库名称
  dialect: 'mysql'
}

if (isTest) {
  config.logging = () => {}
}


// 线上环境，使用连接池
// config.pool = {
//   max: 5, // 连接池中最大的连接数量
//   min: 0, // 连接池中最小的连接数量
//   idle: 10000 // 如果一个连接池 10s 之内没有被使用，则释放
// }

if (isProd) {
  config.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 连接池中最小的连接数量
    idle: 10000 // 如果一个连接池 10s 之内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq

// 测试连接
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(() => {
//   console.log('err')
// })
