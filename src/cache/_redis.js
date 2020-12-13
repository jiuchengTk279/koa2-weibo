// 连接 redis 方法的 get  set

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('errno', err => {
  console.log('redis errno', err)
})

// set
/**
 * redis  set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
function set(key, val, timeout = 60 * 60 ) {
  if (typeof val === 'object') {
    // 转为 string 类型
    val = JSON.stringify(val)
  }
  // 设置键和值
  redisClient.set(key, val)
  // 设置过期时间
  redisClient.expire(key, timeout)
}

// get
/**
 * redis get
 * @param {string} key 键
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }

      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}