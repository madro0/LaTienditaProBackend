"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class LoginController {
    login(req, res) {
        let body = req.body;
        userModel_1.default.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Wrong (email) or password '
                    }
                });
            }
            if (!bcrypt_1.default.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Wrong email or (password)'
                    }
                });
            }
            let token = jsonwebtoken_1.default.sign({
                user: userDB
            }, config_1.config.SEED, {
                expiresIn: config_1.config.CADUCIDAD_TOKEN
            });
            res.json({
                ok: true,
                user: userDB,
                token
            });
        });
    }
}
exports.loginController = new LoginController();
