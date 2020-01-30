/*
 * @Author: your name
 * @Date: 2020-01-30 11:46:20
 * @LastEditTime : 2020-01-30 12:03:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /diary_service/src/app.js
 */

import Koa from 'koa'
import Router from 'koa-router'
import config from './config/index'

const app = new Koa()
const router = new Router()

router.get('/api', async (ctx, next) => {
  ctx.response.body = 'hello'
  await next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(`http://${config.host}:${config.port}`)
})
