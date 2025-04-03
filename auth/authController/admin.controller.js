import Admin from "../authmodel/admit.model.js";
import pool from "../db/dbConfig.js";
export const signOutAction = (req, res, next) => {
  req.session.currentUser = null;
  req.session.isLoggedIn = false;
  req.session.destroy();
  return res.redirect("/");
}

export const signInAction = (request, response, next) => {
  let { email, password } = request.body;
  let admin = new Admin(null, email, password);
  if (email === "admin@gmail.com" && password === "1234") {
    request.session.currentUser = email;
    request.session.isLoggedIn = true;
    return response.redirect("/product/addProduct");
  } else {
    admin.signIn()
      .then(result => {
        if (result.length != 0) {
          request.session.user_id = result[0].id; 
          request.session.currentUser = email;
          request.session.isLoggedIn = true;
          console.log("User Session Updated:", request.session);

          return response.render("Userdashboard.ejs");
        }
        else
          return response.redirect("/sign-in");
      }).catch();
  };
}
export const SingUpAction = ((req, res, next) => {
  let { name, email, password } = req.body;
  pool.getConnection((err, con) => {
    if (!err) {
      let sql = "INSERT INTO  signin(name,email,password) VALUES (?,?,?) ";
      con.query(sql, [name, email, password], (err, result) => {
        if (!err) {
          return res.redirect("/sign-in");
        } else {
          console.log(err);
          return res.status(500).send("Database error");
        }
      });
    } else {
      console.log(err);
    }
  });
});

