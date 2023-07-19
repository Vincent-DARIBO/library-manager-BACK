import * as dotenv from 'dotenv'

dotenv.config()

import config from '../configs/index.js'
import mysql from 'mysql2'

const { db: {
  name,
  host,
  password,
  user
} } = config

const poolConfig = {
  connectionLimit: 10,
  host,
  user,
  password,
  database: name,
}

// create the pool
const createdPoom = mysql.createPool(poolConfig);
// now get a Promise wrapped instance of that pool
export const pool = createdPoom.promise();


