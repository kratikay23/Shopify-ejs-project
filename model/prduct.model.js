import pool from "../auth/db/dbConfig.js";

class Product {
  constructor(id, Images, pName, description, price) {
    this.id = id;
    this.Images = Images;
    this.pName = pName;
    this.description = description;
    this.price = price;
  }
  static deleteOne(productId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "delete from addProduct where id = ?";
          con.query(sql, [productId * 1], (err, result) => {
            con.close();
            err ? reject(err) : resolve(result);
          });
        }
        else reject(err);
      })
    });
  }
  static updateOne(product) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "UPDATE addProduct SET pName=?, description=?,Images=?, price=? WHERE id=?";
          con.query(sql, [product.pName, product.description, product.Images , product.price * 1, product.id * 1], (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          });
        }
        else reject(err);
      })
    });
  }
  static findById(productId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "select * from addProduct where id = ?";
          con.query(sql, [productId * 1], (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          });
        }
        else reject(err);
      })
    });
  }
  static findAll() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "select * from addProduct";
          con.query(sql, (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          })
        }
        else reject(err);
      })
    });
  }
 
  static create(product) {
    return new Promise((resolve, reject) => {

      pool.getConnection((err, con) => {
        if (!err) {
          const sql = 'INSERT INTO addProduct(Images,pName,description,price) VALUES (?,?,?,?)';
          con.query(sql, [product.Images, product.pName, product.description, product.price], (err, results) => {
            con.release();
            err ? reject(err) : resolve(results);
          });
        }
        else
          reject(err);
      })
    });

  }

}

export default Product;