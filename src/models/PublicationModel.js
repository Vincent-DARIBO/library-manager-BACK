import { pool } from './pool.js'

export default class PublicationModel {
    constructor() {
        this.result = {}
    }
    create(title) {
        pool.query(`INSERT INTO pubs (title)
         values(\"${title}\");`, function (error, results, fields) {
            if (error) throw error;
        });


    }
    update({ orderId, newValues }) {


    }
    getAll(callback) {
        const query = pool.query("SELECT * FROM pubs;", function (error, results, fields) {
            if (error) throw error;
            console.log({results})
            callback(results)
        })
    }

    getOne(orderId) {

    }
    delete(orderId) {

    }
}