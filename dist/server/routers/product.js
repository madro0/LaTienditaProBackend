"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middlewares/auth");
class ProductRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', auth_1.auth.verifyToken, productController_1.productController.getProduct);
        this.router.get('', auth_1.auth.verifyToken, productController_1.productController.getAllProducts);
        this.router.post('', auth_1.auth.verifyToken, productController_1.productController.addProduct);
        this.router.put('/:id', auth_1.auth.verifyToken, productController_1.productController.updateProduct);
        this.router.delete('/:id', auth_1.auth.verifyToken, productController_1.productController.deleteProduct);
    }
}
const productRoutes = new ProductRouter();
exports.default = productRoutes.router;
