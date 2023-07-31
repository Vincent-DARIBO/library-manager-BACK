import * as dotenv from "dotenv"

dotenv.config()

export default {
    db: {
        name:  process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
    },
}