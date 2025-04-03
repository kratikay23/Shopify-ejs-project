import {pool} from "../db/dbConfig.js";

export let show = ((request, response, next) => {
    let { email, password } = request.body;
    pool.getConnection((err, con) => {
        if (!err) {
            let sql = "Select * from singin WHERE email =? and password =?";
            con.querry(sql, [email, password], (err, result) => {
                if (!err) {
                  if (result.length!=0) {
                    return response.render("welcom.ejs");
                  }else{
                    console.log("Invalid user Name|| Password");
                  }  
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
});