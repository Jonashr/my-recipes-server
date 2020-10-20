const Pool = require('pg').Pool
const dotenv = require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: "5432",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
})

module.exports = pool