require('dotenv').config()

let PORT = process.env.PORT
let DB_USER
let DB_PASSWORD
let DB_PORT
let DB_NAME
let DB_HOST

if(process.env.NODE_ENV === 'production') {
  DB_USER = process.env.DB_USER
  DB_PASSWORD = process.env.DB_PASSWORD
  DB_PORT = process.env.DB_PORT
  DB_NAME = process.env.DB_NAME
  DB_HOST = process.env.DB_HOST
} else {
  DB_USER = process.env.DB_USER_TEST
  DB_PASSWORD = process.env.DB_PASSWORD_TEST
  DB_PORT = process.env.DB_PORT_TEST
  DB_NAME = process.env.DB_NAME_TEST
  DB_HOST = process.env.DB_HOST_TEST
}



module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_HOST
}