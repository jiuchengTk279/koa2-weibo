/**
 * 微博 @ 关系 controller
 */

const { getAtRelationCount } = require('../services/atRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 获取 @ 我的微博数量
 * @param {number} userId userId
 */
async function getAtMeCount (userId) {
  // service
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

module.exports = {
  getAtMeCount
}
