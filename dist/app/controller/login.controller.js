"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utils/jwt");
const user_model_1 = require("../models/user.model");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('👉 Request body:', req.body);
        const user = yield user_model_1.UserModel.findOne({ email });
        console.log('👉 User from DB:', user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials (user not found)' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log('👉 Compare result:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials (password mismatch)' });
        }
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.role);
        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.loginUser = loginUser;
