import pool from './pool'



export default class OrderModel {
    create({customerId, publicationId, quantity, orderStatus }) {
        pool.query(`INSERT INTO orders (customer_id, publication_id, quantity,status)
         values(${customerId}, ${publicationId}, ${quantity}, ${orderStatus}
            )`, function (error, results, fields) {
            if (error) throw error;
            console.log('create: ',{ results, fields});
          });

        
    }
    update({orderId, newValues}) {
        

    }
    getAll() {
        pool.query("SELECT * FROM orders",function (error, results, fields) {
            if (error) throw error;
            console.log('getAll: ',{ results, fields});
          })

    }
    getOne(orderId) {

    }
    delete(orderId) {
        
    }
}