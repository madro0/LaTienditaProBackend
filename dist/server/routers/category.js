"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const auth_1 = require("../middlewares/auth");
class Login {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('', auth_1.auth.verifyToken, categoryController_1.categoryController.getAllCategories);
        this.router.get('/:id', auth_1.auth.verifyToken, categoryController_1.categoryController.getCategory);
        this.router.post('', auth_1.auth.verifyToken, categoryController_1.categoryController.addCategory);
        this.router.put('/:id', auth_1.auth.verifyToken, categoryController_1.categoryController.updateCategory);
        this.router.delete('/:id', auth_1.auth.verifyToken, categoryController_1.categoryController.deleteCategory);
    }
}
const login = new Login();
exports.default = login.router;
