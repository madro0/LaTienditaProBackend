"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/tienda', (req, res) => {
    res.json({
        ok: true,
        message: 'Todo esta bien'
    });
});
router.get('/tienda/:id', (req, res) => {
    const id = Number(req.params.id);
    res.json({
        ok: true,
        id,
        message: 'Todo esta bien'
    });
});
exports.default = router;
