/**
 * 用户关系 services
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的 id
 */
async function getUsersByFollower (followerId) {
  const result = await User.findAndCountAll ({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      // id 一列，倒序
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUsersByFollower
}
