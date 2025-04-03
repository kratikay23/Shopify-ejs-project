import Product from "../model/prduct.model.js";

export const deleteProduct = (request,response,next)=>{
    let id = request.params.id;
    Product.deleteOne(id)
    .then(result=>{
        return response.redirect("/product/viewProduct");
    }).catch(err=>{
        console.log(err);
    });
}
export const editProduct = (request, response, next) => {
    console.log("🚀 Full Request Body:", request.body);
    console.log("📂 Uploaded File:", request.file);
    
    let id = request.params.id;
    let { pName, description, price } = request.body;
    let Images = request.file ? request.file.filename : null;

    console.log("🔍 Extracted Data:", { id, pName, description, Images, price });

    if (!id || !pName || !description || isNaN(price)) {
        console.log("❌ Invalid input data", { id, pName, description, Images, price });
        return response.status(400).send("Invalid product data");
    }

    Product.updateOne({ id, pName, description, Images, price })
        .then(() => response.redirect("/product/viewProduct"))
        .catch(err => console.log(err));
};


export const editProductPage = (request,response,next)=>{
    let productId = request.params.id;
    Product.findById(productId)
    .then(result=>{
      console.log(result);  
      return response.render("editProduct.ejs",{product:result[0]});
    }).catch(err=>{
        console.log(err);
    })
}
export const viewProductPage = (request,response,next)=>{
    Product.findAll()
    .then(result=>{
        console.log(result);
        return response.render("viewProduct.ejs",{products: result});
        
    }).catch(err=>{
        console.log(err);
    });
}
export const addProductPage = (request,response,next)=>{
    return response.render("addProduct.ejs");
}

export const addProduct = (req, res, next) => {
    // Now req.body will have text fields, and req.file will have file info.
    let { pName, description, price } = req.body;
    // Use req.file for image data:
    let Images = req.file ? req.file.filename : null;

    console.log("Received Data:", req.body);
    console.log("Product name:", pName);
    console.log("Uploaded file:", req.file);

    if (!pName || !description || !price || !Images) {
        return res.status(400).send("All fields are required");
    }

    Product.create({ Images, pName, description, price })
        .then(result => res.redirect("/product/addProduct"))
        .catch(err => console.error(err));
};

  