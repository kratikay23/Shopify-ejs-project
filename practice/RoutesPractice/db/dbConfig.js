import mysql from "mysql2";

export let pool = mysql.createPool({
    user:"root",
    password: "Kratika@23",
    database:"node_app",
    connectionLimit:100
});