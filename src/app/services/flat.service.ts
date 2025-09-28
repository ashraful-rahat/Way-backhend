import { Flat } from '../interfaces/flat.interface';
import { FlatModel } from '../models/flat.model';

const createFlat = async (data: Flat) => {
  return await FlatModel.create(data);
};

const getAllFlats = async () => {
  const result = await FlatModel.find();
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const getFlatById = async (id: string) => {
  return await FlatModel.findById(id);
};

const updateFlat = async (id: string, data: Partial<Flat>) => {
  return await FlatModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteFlat = async (id: string) => {
  return await FlatModel.findByIdAndDelete(id);
};

export const FlatService = {
  createFlat,
  getAllFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
};
