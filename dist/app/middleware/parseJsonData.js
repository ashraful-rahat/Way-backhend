"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonData = void 0;
const parseJsonData = (req, res, next) => {
    console.log('👉 Before parsing:', req.body);
    if (req.body.data) {
        try {
            const parsed = JSON.parse(req.body.data);
            req.body = Object.assign(Object.assign({}, parsed), req.body);
            delete req.body.data;
            console.log('👉 After parsing:', req.body); // ✅ after merge
        }
        catch (err) {
            console.error('❌ JSON parse error:', err);
            res.status(400).json({ status: 'fail', message: 'Invalid JSON data' });
            return;
        }
    }
    else {
        console.log('👉 No data key to parse, body remains:', req.body);
    }
    next();
};
exports.parseJsonData = parseJsonData;
