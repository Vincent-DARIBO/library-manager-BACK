import { pool } from '../db/pool.js'
import { OrderStatus } from '../utils/enums.js';

export default class OrderModel {
    constructor() { }

    // TODO: définir un costomer par défaut
    async create({ customerId, publicationId, status = OrderStatus.NOT_SENT, quantity }) {
        const [existingOrder] = await pool.query(`select id from orders where customer_id = ${customerId} and publication_id = ${publicationId}`)
        let lastGlobalOrderId = null

        if (existingOrder[0]) {
            return { id: existingOrder[0].id }
        }

        const [notSentOrder] = await pool.query("select id from global_orders where status = 'NOT_SENT' LIMIT 1;")

        if (!notSentOrder.length) {
            await pool.query("insert into global_orders () values();")
            const [lastNotSentOrder] = await pool.query("select id from global_orders where status = 'NOT_SENT' LIMIT 1;")
            lastGlobalOrderId = lastNotSentOrder[0].id
        } else {
            lastGlobalOrderId = notSentOrder[0].id
        }

        const [rows] = await pool.query(`INSERT INTO orders (customer_id, publication_id, quantity, status, global_order_id)
         values(${customerId}, ${publicationId},  ${quantity}, '${status}', ${lastGlobalOrderId});`);
        return rows
    }

    async update(orderId, newInfos) {
        const [order] = await pool.query(`SELECT * FROM orders WHERE id = ${orderId}`)

        if (!order[0]) {
            return null
        }

        const updatedInfos = Object.entries(newInfos).map((item) => `${item[0]} = \'${item[1]}\'`).join(',')
        const query = 'UPDATE orders SET ' + updatedInfos + ` WHERE id = ${order[0].id};`
        const [rows] = await pool.query(query)
        return rows
    }

    async updateStatus(globalOrderId, newStatus) {
        if (![0, 1, 2, 3].includes(newStatus))
            throw "Invalid order status"
        await pool.query(`UPDATE global_orders SET status = '${newStatus}' WHERE id = ${globalOrderId}`)
        await pool.query(`UPDATE orders SET status = '${newStatus}' WHERE global_order_id = ${globalOrderId}`)
    }


    async getCustomersAll() {
        const [rows] = await pool.query(`SELECT orders.id, customers.first_name, customers.last_name, pubs.title, orders.quantity
        FROM ((orders INNER JOIN customers ON orders.customer_id = customers.id)
        INNER JOIN pubs on orders.publication_id = pubs.id);`)
        return rows
    }

    async getGlobalsAll() {
        let mapped = []
        let index = undefined

        const [rows] = await pool.query(`SELECT global_orders.id, global_orders.status, global_orders.created_at,  pubs.title, pubs.id AS pub_id, orders.quantity
        FROM ((global_orders INNER JOIN orders ON global_orders.id = orders.global_order_id)
        INNER JOIN pubs on orders.publication_id = pubs.id);`)
        rows.forEach((item) => {
            const { id, created_at, status, ...rest } = item
            if ((index = mapped.findIndex((item) => item.id === id)) !== -1) {

                mapped[index]?.publications?.push(rest)
            }
            else {
                mapped.push({ id, status, created_at, publications: [rest] })
            }
        })
        mapped = mapped.map(item => {
            const { publications } = item
            const newPubs = []
            let pubIndex = -1

            publications.forEach(item => {
                if ((pubIndex = newPubs.findIndex(pub => pub.pub_id === item.pub_id)) !== - 1) {
                    newPubs.at(pubIndex).quantity += item.quantity

                } else {
                    newPubs.push(item)
                }
            })
            return { ...item, publications: newPubs }
        })
        return mapped
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