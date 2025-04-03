import pool from "../../auth/db/dbConfig.js";

class UserProduct {
    constructor(id, pName, Images, description, price) {
        this.id = id;
        this.pName = pName;
        this.Images = Images;
        this.description = description;
        this.price = price;
    }

    static findAllPro() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) return reject(err);
                let sql = "SELECT * FROM addProduct";
                con.query(sql, (err, result) => {  //  Query run karega
                    con.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);  //Products return honge
                    }
                });
            });
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



    static checkUserExists(user_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) return reject(err);
                let sql = "SELECT id FROM signin WHERE id = ?";
                con.query(sql, [user_id], (err, result) => {
                    con.release();
                    err ? reject(err) : resolve(result.length > 0);
                });
            });
        });
    }
    


    static checkOut(user_id, address, payment_method, total_amount) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "INSERT INTO payment (user_id, address, payment_method, total_amount) VALUES (?, ?, ?, ?)";
                    con.query(sql, [user_id, address, payment_method, total_amount], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    });
                } else {
                    reject(err);
                }
            });
        });
    }

     static findCartItems(cart) {
        return new Promise((resolve, reject) => {
            if (!cart || cart.length === 0) {
                return resolve([]);
            }

            let productIds = cart.map(p => p.id);
            pool.getConnection((err, con) => {
                if (err) return reject(err);
                let sql = `SELECT * FROM addProduct WHERE id IN (?)`;
                con.query(sql, [productIds], (err, result) => {
                    con.release();
                    if (err) {
                        reject(err);
                    } else {
                        // Attach quantity from session cart
                        result.forEach(product => {
                            let cartItem = cart.find(p => p.id == product.id);
                            product.quantity = cartItem ? cartItem.quantity : 1;
                        });
                        resolve(result);
                    }
                });
            });
        });
    
    }

}

export default UserProduct;
