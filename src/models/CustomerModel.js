import { pool } from '../db/pool.js'

export default class CustomerModel {
    constructor() { }

    async create({ first_name, last_name, email, phone }) {
        const [rows] = await pool.query(`INSERT INTO customers (first_name, last_name, email, phone)
         values(\"${first_name}\", \"${last_name}\", \"${email}\", \"${phone}\");`);
        return rows


    }
    async update(customerId, newInfos) {
        try {
            const rows = await pool.query(`SELECT * FROM customers WHERE id = ${customerId}`).then(async ([customer]) => {
                console.log({ customer: customer[0] });
                if (!customer[0]) {
                    return null
                }
                const updatedInfos = Object.entries(newInfos).map((item) => `${item[0]} = \'${item[1]}\'`).join(',')
                const query = 'UPDATE customers SET ' + updatedInfos + ` WHERE id = ${customerId};`
                const [updateQueryResult] = await pool.query(query)
                return updateQueryResult
            })
            return rows
        } catch (e) {
            console.error(e);
            return null
        }

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
        return rows[0] ?? null

    }
    async delete(customerId) {
        const [rows] = await pool.query(`DELETE FROM customers WHERE id = ${customerId};`)
        return rows
    }
}