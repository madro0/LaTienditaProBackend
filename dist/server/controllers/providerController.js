"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerController = void 0;
const providerModel_1 = __importDefault(require("../models/providerModel"));
const underscore_1 = __importDefault(require("underscore"));
class ProviderController {
    getProvider(req, res) {
        let id = req.params.id;
        providerModel_1.default.find()
            .where('_id').equals(id)
            .where('active').equals(true)
            .exec((err, providerDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (Object.keys(providerDB).length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No hay ningun producto activo con este id'
                    }
                });
            }
            res.json({
                ok: true,
                provider: providerDB
            });
        });
    }
    getAllProviders(req, res) {
        providerModel_1.default.find({ active: true }, 'name nit cel phone web address')
            .exec((err, providers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            providerModel_1.default.countDocuments({ state: true })
                .exec((err, count) => {
                res.json({
                    ok: true,
                    providers,
                    totalProviders: count
                });
            });
        });
    }
    addProvider(req, res) {
        let body = req.body;
        let provider = new providerModel_1.default({
            name: body.name,
            nit: body.nit,
            cel: body.cel,
            phone: body.phone,
            web: body.web,
            address: body.address
        });
        provider.save((err, providerDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                provider: providerDB
            });
        });
    }
    updateProvider(req, res) {
        const id = req.params.id;
        let body = underscore_1.default.pick(req.body, ['name', 'nit', 'cel', 'phone', 'web', 'address']);
        providerModel_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
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
        let body = { active: false };
        providerModel_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, providerDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: 'provider Delete_1',
                provider: providerDB
                //================
                //NOTAS:
                //Delete_1 se cambio simplemente de estado
                //Delete_0 se elimina completamente la Db
                //================
            });
        });
    }
}
exports.providerController = new ProviderController();
