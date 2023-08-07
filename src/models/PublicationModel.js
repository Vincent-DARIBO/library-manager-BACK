import { pool } from '../db/pool.js'

export default class PublicationModel {
    constructor() { }

    async create(title) {
        const [rows] = await pool.query(`INSERT INTO pubs (title)
         values(\"${title}\");`);
        return rows


    }
    async update(pubId, newTitle) {

        const [rows] = await pool.query(`UPDATE pubs
        SET title = '${newTitle}'
        WHERE id = ${pubId};`)
        return rows

    }
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM pubs;")
        return rows
    }

    async getOne(pubName) {
        const [rows] = await pool.query(`SELECT * FROM pubs WHERE title LIKE "${pubName}%";`)
        return rows

    }
    async delete(pubId) {
        const [rows] = await pool.query(`DELETE FROM pubs WHERE id = ${pubId};`)
        return rows
    }
}