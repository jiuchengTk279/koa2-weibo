/**
 * 首页 test
 */

const server = require('../server')

// const COOKIE = 'weibo.sid=s1zL7xTkHY3FIkimg6oURYhMWw89p0Sa; weibo.sid.sig=bsZx0wcoy7S3jyufhUf4ldSR7D4'
const { COOKIE } = require('../testUserInfo')

// 存储微博 id
let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
  // 定义测试内容
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'

  // 开始测试
  const res = await server.post('/api/blog/create').send('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  // 记录微博 id
  BLOG_ID = res.body.data.id
})
