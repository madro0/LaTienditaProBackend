"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', auth_1.auth.verifyToken, auth_1.auth.verifyRole, userController_1.userController.getUser);
        this.router.get('', auth_1.auth.verifyToken, auth_1.auth.verifyRole, userController_1.userController.getAllUsers);
        this.router.post('', auth_1.auth.verifyToken, auth_1.auth.verifyRole, userController_1.userController.addUser);
        this.router.put('/:id', auth_1.auth.verifyToken, auth_1.auth.verifyRole, userController_1.userController.updateUser);
        this.router.delete('/:id', auth_1.auth.verifyToken, auth_1.auth.verifyRole, userController_1.userController.deleteUser);
    }
}
const userRoutes = new UserRouter();
exports.default = userRoutes.router;
