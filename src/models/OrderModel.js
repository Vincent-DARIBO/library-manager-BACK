import { pool } from '../db/pool.js'
import { OrderStatus } from '../utils/enums.js';

// todo: retester les routes
export default class OrderModel {
    constructor() { }

    async create({ customerId, publicationId, status = OrderStatus.NOT_SENT, quantity }) {
        const [existingOrder] = await pool.query(`select id from orders where customer_id = ${customerId} and publication_id = ${publicationId}`)

        if (existingOrder[0]) {
            return {id: existingOrder[0].id }
        }


        const [rows] = await pool.query(`INSERT INTO orders (customer_id, publication_id, quantity, status)
         values(${customerId}, ${publicationId},  ${quantity}, ${status});`);
        return rows
    }
    async update(orderId, { status, quantity }) {
        const [order] = await pool.query(`SELECT * FROM orders WHERE id = ${orderId}`)

        if (!order[0]) {
            return null
        }
        const updatedInfos = {
            ...order[0],
            status: status ?? order[0].status,
            quantity: quantity ?? order[0].quantity
        }
        const [rows] = await pool.query(`UPDATE orders
        SET status = '${updatedInfos.status}',
         quantity = '${updatedInfos.quantity}'
        WHERE id = ${order[0].id};`)
        return rows
    }
    async getAll() {
        const [rows] = await pool.query(`SELECT orders.id, customers.first_name, customers.last_name, pubs.title, orders.quantity
        FROM ((orders INNER JOIN customers ON orders.customer_id = customers.id)
        INNER JOIN pubs on orders.publication_id = pubs.id);`)
        return rows
    }

    async getOne(orderId) {
        const [rows] = await pool.query(`SELECT orders.id, customers.first_name, customers.last_name, pubs.title, orders.quantity
        FROM ((orders INNER JOIN customers ON orders.customer_id = customers.id)
        INNER JOIN pubs on orders.publication_id = pubs.id)
         WHERE orders.id = ${orderId};`)
        return rows

    }

    async getByPublicationId(pubId) {
        const [rows] = await pool.query(`SELECT  customers.first_name, customers.last_name, orders.quantity
        FROM ((orders INNER JOIN customers ON orders.customer_id = customers.id)
        INNER JOIN pubs on orders.publication_id = pubs.id)
        WHERE publication_id = ${pubId};`)
        return rows ?? null

    }
    async getByCustomerId(customerId) {
        const [rows] = await pool.query(`SELECT  pubs.title, orders.quantity
        FROM ((orders INNER JOIN customers ON orders.customer_id = customers.id)
        INNER JOIN pubs on orders.publication_id = pubs.id) 
         WHERE customer_id = ${customerId};`)
        return rows ?? null

    }
    async delete(orderId) {
        const [rows] = await pool.query(`DELETE FROM orders WHERE id = ${orderId};`)
        return rows
    }
}