import  mysql from 'mysql'
import * as dotenv from 'dotenv'

dotenv.config()

import config from'../configs/index.js'

const { db : {
  name,
  host,
  password,
  user
} } = config

export const pool  = mysql.createPool({
  connectionLimit : 10,
  host,
  user,
  password,
  database: name,
});


