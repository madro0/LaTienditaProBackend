"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = __importDefault(require("./usuario"));
const login_1 = __importDefault(require("./login"));
const category_1 = __importDefault(require("./category"));
const provider_1 = __importDefault(require("./provider"));
const product_1 = __importDefault(require("./product"));
const router = express_1.Router();
//=================================
//Url (http://localhost:3000/api/)
//=================================
//=================================
//router user
//=================================
router.use('/user', usuario_1.default);
//=================================
//router login
//=================================
router.use('/login', login_1.default);
//=================================
//router category
//=================================
router.use('/category', category_1.default);
//=================================
//router provider
//=================================
router.use('/provider', provider_1.default);
//=================================
//router product
//=================================
router.use('/product', product_1.default);
exports.default = router;
