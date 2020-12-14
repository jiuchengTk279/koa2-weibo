/**
 * json schema 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 输出所有的错误，比较慢
})

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  // 校验失败
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate