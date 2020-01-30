/*
 * @Author: your name
 * @Date: 2020-01-30 12:16:14
 * @LastEditTime : 2020-01-30 12:26:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /diary_service/src/db/db.js
 */

/**
 * 数据库封装
 * @param {sql} sql 
 * @param {values} values 
 */
import mysql from 'koa-mysql'
import config from '../config/index'

// create pool
let pool = mysql.createPool({
  host:       config.mysql.host,
  user:       config.mysql.user,
  password:   config.mysql.password,
  database:   config.mysql.database,
  port:       config.mysql.port
})

// create query
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err)
      connection.query(sql, values, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
        connection.release()
      })
    })
  })
}

export default query
