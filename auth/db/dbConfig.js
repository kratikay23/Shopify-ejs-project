import mysql from "mysql2";
let pool = mysql.createPool({
    user : "root",
    password : "Kratik@23",
    database : "node_app",
    connectionLimit :100
});

export default pool;