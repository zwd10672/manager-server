const router = require('koa-router')()
const User = require('./../models/userSchema.js')
const util = require('./../utils/util.js')
router.prefix('/users')

router.post('/login', async function (ctx, next) {

  const { userName, userPwd } = ctx.request.body
  const res = await User.findOne({
    userName,
    userPwd
  })
  if (res) {
    ctx.body = util.success(res)
  } else {
    ctx.body = util.fail('账号或密码不正确')
  }


})


module.exports = router
