import { pool } from '../db/pool.js'

export default class CustomerModel {
    constructor() { }

    async create({ firstName, lastName, email, phone }) {
        const [rows] = await pool.query(`INSERT INTO customers (first_name, last_name, email, phone)
         values(\"${firstName}\", \"${lastName}\", \"${email}\", \"${phone}\");`);
        return rows


    }
    async update(customerId, newInfo) {
        const [rows] = pool.query(`SELECT * FROM customers WHERE id = ${customerId}`)
        console.log({ rows });
        return []
        // if (!customer[0]) {
        //     return null
        // }
        // const updatedInfos = {
        //     ...customer[,
        //     ...newInfo
        // }
        // const [rows] = await pool.query(`UPDATE customers
        // SET first_name = '${updatedInfos.firstName}',
        //  last_name = '${updatedInfos.lastName}', 
        //  email = '${updatedInfos.email}',
        //  phone = '${updatedInfos.phone}'
        // WHERE id = ${customerId}`)
        // return rows

    }
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM customers;")
        return rows
    }

    async getOne(pubName) {
        const [rows] = await pool.query(`SELECT * FROM customers WHERE first_name LIKE "${pubName}%";`)
        return rows

    }


    async getByEmail(email) {
        const [rows] = await pool.query(`SELECT * FROM customers WHERE email LIKE "${email}%";`)
        return rows

    }
    async delete(customerId) {
        const [rows] = await pool.query(`DELETE FROM customers WHERE id = ${customerId};`)
        return rows
    }
}