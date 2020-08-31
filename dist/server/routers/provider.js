"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerController_1 = require("../controllers/providerController");
const auth_1 = require("../middlewares/auth");
class ProviderRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', auth_1.auth.verifyToken, auth_1.auth.verifyRole, providerController_1.providerController.getProvider);
        this.router.get('', auth_1.auth.verifyToken, auth_1.auth.verifyRole, providerController_1.providerController.getAllProviders);
        this.router.post('', auth_1.auth.verifyToken, auth_1.auth.verifyRole, providerController_1.providerController.addProvider);
        this.router.put('/:id', auth_1.auth.verifyToken, auth_1.auth.verifyRole, providerController_1.providerController.updateProvider);
        this.router.delete('/:id', auth_1.auth.verifyToken, auth_1.auth.verifyRole, providerController_1.providerController.deleteUser);
    }
}
const providerRoutes = new ProviderRouter();
exports.default = providerRoutes.router;
