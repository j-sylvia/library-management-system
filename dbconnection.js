var mysql=require('mysql2');
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'lms',
    port:'3306',
    multipleStatements:true
})
module.exports=connection;

// This code creats a connection pool, which is a group of connections that can be reused accross multiple queries. This can the performance of your node.js app by reducing the overhead of creating and closing connections.