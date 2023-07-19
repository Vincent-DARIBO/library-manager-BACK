import { pool } from '../db/pool.js'

export default class PublicationModel {
    constructor() {}

    async create(title) {
        const [rows] = await pool.query(`INSERT INTO pubs (title)
         values(\"${title}\");`);
        return rows


    }
    update({ orderId, newValues }) {


    }
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM pubs;")
        return rows
    }

    async getOne(pubName) {
        const [rows] = await pool.query(`SELECT title FROM pubs WHERE title LIKE "${pubName}%";`)
        console.log("getOne", rows)
        return rows

    }
    async delete(pubId) {
        const [rows] = await pool.query(`DELETE FROM pubs WHERE id = ${pubId};`)
        return rows
    }
}

// const publicationModel =  new PublicationModel()

// export default publicationModel