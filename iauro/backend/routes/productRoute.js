const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct } = require("../controllers/productController");
const { isAuthenticateduser,authorizeRole } = require("../middleware/auth");


const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(authorizeRole("admin"),updateProduct);
router.route("/product/delete/:id").delete(authorizeRole("admin"),deleteProduct);

module.exports = router