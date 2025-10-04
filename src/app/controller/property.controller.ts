import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { PropertyService } from '../services/property.service';

const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newImages = (req.files as any)?.images?.map((f: any) => f.path) || [];
    const data = { ...req.body, images: newImages };
    const result = await PropertyService.createProperty(data);
    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Property created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newImages = (req.files as any)?.images?.map((f: any) => f.path) || [];
    const existingImages = (req.body.existingImages as string[]) || [];
    const images = [...existingImages, ...newImages];

    const data = { ...req.body, images };

    const result = await PropertyService.updateProperty(req.params.id, data);

    if (!result)
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Property not found',
      });

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Property updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await PropertyService.getPropertyById(req.params.id);
    if (!property)
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Property not found',
      });

    await PropertyService.deleteProperty(req.params.id);
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Property deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getAllProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PropertyService.getAllProperties();
    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PropertyService.getPropertyById(req.params.id);
    if (!result)
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Property not found',
      });
    res.status(httpStatus.OK).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const PropertyController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
};
