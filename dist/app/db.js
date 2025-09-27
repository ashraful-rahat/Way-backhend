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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const globalAny = global;
if (!globalAny._mongo) {
    globalAny._mongo = { conn: null, promise: null };
}
const connectDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (retries = 5, delay = 5000) {
    if (globalAny._mongo.conn)
        return globalAny._mongo.conn;
    while (retries > 0) {
        try {
            if (!globalAny._mongo.promise) {
                globalAny._mongo.promise = mongoose_1.default.connect(config_1.default.database_url, {
                    bufferCommands: false,
                    connectTimeoutMS: 60000,
                    serverSelectionTimeoutMS: 60000,
                    socketTimeoutMS: 45000,
                });
            }
            globalAny._mongo.conn = yield globalAny._mongo.promise;
            console.log('✅ MongoDB connected successfully!');
            return globalAny._mongo.conn;
        }
        catch (error) {
            console.error(`Failed to connect to MongoDB. Retries left: ${retries}`);
            retries--;
            if (retries === 0) {
                throw error;
            }
            yield new Promise((res) => setTimeout(res, delay));
            delay *= 2; //Exponential Backoff
        }
    }
});
exports.default = connectDB;
