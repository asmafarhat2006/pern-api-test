const config = require('../config');
const Pool = require('pg').Pool
const pool = new Pool(config);
const moment = require('moment');

const getOrderItemsByOrderId = (request, response) => {
    const orderid = parseInt(request.params.orderid)
  
         // Generate SQL statement
      const statement = 'SELECT oi.qty,oi.id AS orderitemid, p.* FROM orderitems oi INNER JOIN products p ON p.id = oi.productid WHERE orderId = $1';
     pool.query(statement, [orderid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  async function createOrderItemsAsync(item,orderid) {
    try {

      const created = moment.utc().toISOString();
      const description = item.description;
      const  name = item.name;
      const price = item.price || 0;
      const productid = item.id;
      const qty = item.qty || 1;
  
      // Generate SQL statement
      const statement = `INSERT INTO orderitems (created,description,name,price,productid,qty,orderid) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *`
      const values = [created,description,name,price,productid,qty,orderid];
  
      // Execute SQL statment
      const result = await pool.query(statement, values);

      if (result.rows?.length) {
        console.log('inserted');
        console.log(result.rows);
        //return result.rows;
      }

      //return [];

    } catch(err) {
      throw new Error(err);
    }
  }
  const createOrderItem = (request, response) => {
    
    const created = moment.utc().toISOString();
    const description = request.body.description;
    const  name = request.body.name;
    const price = request.body.price || 0;
    const productid = request.body.productid;
    const qty = request.body.qty || 1;
    const orderid = request.body.orderId || null;
    
    pool.query('INSERT INTO orderitems (created,description,name,price,productid,qty,orderid) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *', [created,description,name,price,productid,qty,orderid], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(result.rows[0])
    })
  }
  
  
  
  module.exports = {
 createOrderItem,
 getOrderItemsByOrderId,
 createOrderItemsAsync

  }