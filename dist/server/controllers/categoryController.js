"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const underscore_1 = __importDefault(require("underscore"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class CategoryController {
    getCategory(req, res) {
        let id = req.params.id;
        categoryModel_1.default.findOne({ '_id': id, state: true }, (err, categoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!categoryDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'There is no active category with this id'
                    }
                });
            }
            res.json({
                ok: true,
                category: categoryDB
            });
        });
    }
    getAllCategories(req, res) {
        categoryModel_1.default.find({ state: true }, (err, categoriesDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            categoryModel_1.default.countDocuments({ state: true }, (err, count) => {
                res.json({
                    ok: true,
                    categories: categoriesDB,
                    totalCategories: count
                });
            });
        });
    }
    addCategory(req, res) {
        let body = req.body;
        let category = new categoryModel_1.default({
            name: body.name,
            description: body.description,
            user: body.user,
        });
        category.save((err, categoryDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: `New category ${categoryDB.name} successfully created`,
                category: categoryDB
            });
        });
    }
    updateCategory(req, res) {
        const id = req.params.id;
        let body = underscore_1.default.pick(req.body, ['name', 'description']);
        categoryModel_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoryDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: `Category ${categoryDB.name} successfully updated`,
                category: categoryDB
            });
        });
    }
    deleteCategory(req, res) {
        const id = req.params.id;
        let vody = { state: false };
        categoryModel_1.default.findOne({ '_id': id }, (err, categoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!categoryDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'There is no active category with this id'
                });
            }
            categoryDB.state = false;
            categoryDB.save((er, categoryDeleted) => {
                if (er) {
                    return res.status(500).json({
                        ok: false,
                        err: er
                    });
                }
                res.json({
                    ok: true,
                    category: categoryDeleted,
                    message: 'Category successfully deleted'
                });
            });
        });
    }
}
exports.categoryController = new CategoryController();
