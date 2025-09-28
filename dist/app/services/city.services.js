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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const city_model_1 = require("../models/city.model");
const createCity = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield city_model_1.CityModel.create(data);
});
const getAllCities = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield city_model_1.CityModel.find();
    // latest first
    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
});
const getCityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield city_model_1.CityModel.findById(id);
});
const updateCity = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield city_model_1.CityModel.findByIdAndUpdate(id, data, { new: true });
});
const deleteCity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield city_model_1.CityModel.findByIdAndDelete(id);
});
exports.CityService = {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity,
};
