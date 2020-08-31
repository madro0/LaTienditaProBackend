"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
;
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'The name is necessary']
    },
    description: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: Boolean,
        default: true
    }
});
CategorySchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unico' });
exports.default = mongoose_1.model('Category', CategorySchema);
