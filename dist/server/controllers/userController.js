"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const underscore_1 = __importDefault(require("underscore"));
class UserController {
    getUser(req, res) {
        let id = req.params.id;
        userModel_1.default.find()
            .where('_id').equals(id)
            .where('state').equals(true)
            .exec((err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (Object.keys(userDB).length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'There is no active user with this id'
                    }
                });
            }
            res.json({
                ok: true,
                user: userDB
            });
        });
    }
    getAllUsers(req, res) {
        let from = req.query.from || 0;
        from = Number(from);
        let limit = req.query.limit || 100;
        limit = Number(limit);
        userModel_1.default.find({ state: true }, 'name email role google')
            .skip(from)
            .limit(limit)
            .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            userModel_1.default.countDocuments({ state: true })
                .exec((err, count) => {
                res.json({
                    ok: true,
                    users,
                    totalUsers: count,
                    from,
                    limit
                });
            });
        });
    }
    addUser(req, res) {
        let body = req.body;
        let user = new userModel_1.default({
            name: body.name,
            email: body.email,
            password: bcrypt_1.default.hashSync(body.password, 10),
            role: body.role,
        });
        user.save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user: userDB
            });
        });
    }
    updateUser(req, res) {
        const id = req.params.id;
        let body = underscore_1.default.pick(req.body, ['name', 'img', 'role', 'state']);
        userModel_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user: userDB
            });
        });
    }
    deleteUser(req, res) {
        const id = req.params.id;
        let body = { state: false };
        userModel_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: 'User Delete_1',
                user: userDB
                //================
                //NOTAS:
                //Delete_1 se cambio simplemente de estado
                //Delete_0 se elimina completamente la Db
                //================
            });
        });
    }
    Test(req, res) {
        const id = req.params.id;
        res.json({
            ok: true,
            id,
            message: 'Todo esta bien'
        });
    }
}
exports.userController = new UserController();
