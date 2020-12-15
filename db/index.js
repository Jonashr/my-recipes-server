const Pool = require('pg').Pool
const config = require('../utils/config')

const pool = new Pool({
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  database: config.DB_NAME,
  host: config.DB_HOST
})


module.exports = pool