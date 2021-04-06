const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router.get("/", productController.getAllProducts);
router.get("/conditions", productController.getConditionProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
