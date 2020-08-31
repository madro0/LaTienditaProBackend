"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class Auth {
    //=============================
    //Verificar Token
    //=============================
    verifyToken(req, res, next) {
        const token = req.get('Authorization');
        jsonwebtoken_1.default.verify(token, config_1.config.SEED, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    err: {
                        message: 'Autorization (token) invalid'
                    }
                });
            }
            req.user = decode.user;
            next();
        });
    }
    //=============================
    //Verificar Token
    //=============================
    verifyRole(req, res, next) {
        let user = req.user;
        if (user.role != 'ADMIN_ROLE') {
            return res.status(400).json({
                err: {
                    message: 'this account does not have administrator permissions'
                }
            });
        }
        next();
    }
}
exports.auth = new Auth();
