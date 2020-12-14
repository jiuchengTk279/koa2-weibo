/**
 * User API 路由
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
const userValidate = require('../../validator/user')
const genValidator = require('../../middlewares/validator')

router.prefix('/api/user')

// 注册路由
// 先校验再注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  // 注册
  const { userName, password, gender } = ctx.request.body
  // 调用 controller
  ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})


module.exports = router