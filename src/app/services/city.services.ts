import { City } from '../interfaces/city.interface';
import { CityModel } from '../models/city.model';

//create new city
const createCity = async (data: Partial<City>) => {
  return await CityModel.create(data);
};
const getAllCities = async () => {
  const result = await CityModel.find();
  // latest first
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const getCityById = async (id: string) => {
  return await CityModel.findById(id);
};

const updateCity = async (id: string, data: Partial<City>) => {
  return await CityModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteCity = async (id: string) => {
  return await CityModel.findByIdAndDelete(id);
};

export const CityService = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
