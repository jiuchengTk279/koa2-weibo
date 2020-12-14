/**
 *  user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 *  用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  // 业务逻辑处理 
  // 调用 services 获取数据
  // 返回统一格式

  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在
    // { errno: 0, data: {...} }
    return new SuccessModel(userInfo)
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }

}


/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男， 2 女， 3 保密)
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在，不能再注册
    return ErrorModel(registerUserNameExistInfo)
  } 

  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}


/**
 * 登录
 * @param {*} ctx koa2 ctx
 * @param {*} userName 用户名
 * @param {*} password 密码
 */
async function login (ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }

  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}


module.exports = {
  isExist,
  register,
  login
}