"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
;
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    },
    description: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La category es necesaria']
    },
    provider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, 'El provider es necesario']
    },
    purchasePrice: {
        type: Number,
        required: [true, 'EL purchasePrice es necesario']
    },
    unitPrice: {
        type: Number,
        required: [true, 'El unitPrice es necesario']
    },
    wholesalePrice: {
        type: Number,
        required: false
    },
    iva: {
        type: Number,
        default: 0.0,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El user es necesario']
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    modificationDate: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Boolean,
        default: true
    }
});
ProductSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} must be unique' });
exports.default = mongoose_1.model('Product', ProductSchema);
