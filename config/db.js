const mongoose = require('mongoose');
const mongodbUrl = require('./index');
const log4js = require('./../utils/log4j')

mongoose.connect(mongodbUrl.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected!'));

const db = mongoose.connection;

db.on('error', () => {
  log4js.error('***数据库连接失败***')
})

db.on('open', () => {
  log4js.info('***数据库连接成功***')
})