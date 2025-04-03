import pool from "../db/dbConfig.js";

class Admin{
    constructor(id,email,password){
        this.id = id;
        this.email = email;
        this.password = password;
    }

    signIn(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                   let sql = "select * from signin where email = ? and password = ?";
                   con.query(sql,[this.email,this.password],(err,result)=>{
                     con.release();
                     err ? reject(err) : resolve(result);
                   }); 
                }
                else
                 reject(err);
            })
        });
    }
}

export default Admin;