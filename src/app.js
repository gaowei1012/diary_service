/*
 * @Author: your name
 * @Date: 2020-01-30 11:46:20
 * @LastEditTime : 2020-01-30 15:56:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /diary_service/src/app.js
 */
'use strict'

import Koa from 'koa'
import Router from 'koa-router'
import config from './config/index'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import mysqlStore from 'koa-mysql-session'
import session from 'koa-session-minimal'

const app = new Koa()
const router = new Router()

const sessionMysqlConfig = {
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  host: config.mysql.host
}

app.use(session({
  key: 'USER_SID',
  store: new mysqlStore(sessionMysqlConfig)
}))

router.get('/api', async (ctx, next) => {
  ctx.response.body = 'hello'
  await next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  // .use(jwt({secret: 'shared-secret'}))
  .use(bodyParser())

app.listen(config.port, () => {
  console.log(`http://${config.host}:${config.port}`)
})
