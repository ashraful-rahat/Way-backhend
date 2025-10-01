import { Property } from '../interfaces/property.interface';
import { PropertyModel } from '../models/property.model';

const createProperty = async (data: Property) => {
  return await PropertyModel.create(data);
};

const getAllProperties = async () => {
  const result = await PropertyModel.find();
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const getPropertyById = async (id: string) => {
  return await PropertyModel.findById(id);
};

const updateProperty = async (id: string, data: Partial<Property>) => {
  return await PropertyModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteProperty = async (id: string) => {
  return await PropertyModel.findByIdAndDelete(id);
};

export const PropertyService = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
