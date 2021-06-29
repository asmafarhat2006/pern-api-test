const config = require('../config');
const Pool = require('pg').Pool
const pool = new Pool(config);
const moment = require('moment');
  
  const getCartById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM carts WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getCartByUserId = (request,response) => {
    const userid = request.user;
  
    pool.query('SELECT ci.id FROM carts c join cartitems ci on ci.cartid = c.id '+
    ' join products p on ci.productid = p.id  WHERE c.userid = $1', [userid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }) 
  }
  const createCart = (request, response) => {
    const userid = request.user;
    pool.query('with s as ( '+
        ' select userid,id  from carts where userid = $1),'+
        ' i as ( '+
        ' insert into carts (userid,modified,created) '+
        ' select $1,$2,$3     where not exists (select 1 from s) '+
        ' returning userid,id ) '+
        ' select id,userid  from i '+
        ' union all'+
        ' select id,userid'+
        '   from s', [userid,moment.utc().toISOString(),moment.utc().toISOString()], (error, result) => {
      if (error) {
        throw error
      }
     
    })
  }
   async function createCartAsync(userid) {
    console.log('inside function');
    console.log(userid);
    try{
    const result = await pool.query('with s as ( ' +
       ' select userid,id  from carts where userid = $1),' +
       ' i as ( ' +
       ' insert into carts (userid,modified,created) ' +
       ' select $1,$2,$3     where not exists (select 1 from s) ' +
       ' returning userid,id ) ' +
       ' select id,userid  from i ' +
       ' union all' +
       ' select id,userid' +
       '   from s', [userid, moment.utc().toISOString(), moment.utc().toISOString()]);
       const cart = result.rows[0];
   
       const itemsresults = await pool.query('SELECT ci.id  as cartItemId,p.*,ci.qty  FROM carts c join cartitems ci on ci.cartid = c.id '+
        ' join products p on ci.productid = p.id  WHERE c.userid = $1', [result.rows[0].userid]);
         
          cart.items = itemsresults.rows;
         return (cart);
        
    }
    catch(err){
      return err.stack;
    }
  }

  
  
  module.exports = {
    
    getCartById,
    getCartByUserId,
    createCart,
    createCartAsync
  }