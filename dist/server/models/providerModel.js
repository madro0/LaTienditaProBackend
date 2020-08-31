"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProviderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    nit: {
        type: String,
        required: false
    },
    cel: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    web: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true,
        required: false
    }
});
exports.default = mongoose_1.model('Provider', ProviderSchema);
