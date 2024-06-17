const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
// log4js
const logger = require('./utils/log4j')

const users = require('./routes/users')

// connect mongodb
require('./config/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  logger.info(`get params:${JSON.stringify(ctx.request.query)}`)
  logger.info(`post params: ${JSON.stringify(ctx.request.body)}`)
  await next()
})

router.prefix('/api')
router.use(users.routes(), users.allowedMethods())
// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  logger.error(`${err.stack}`)
});

module.exports = app
