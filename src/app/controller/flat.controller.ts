import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { FlatService } from '../services/flat.service';

const createFlat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // multiple images
    const images = (req.files as any)?.map((file: any) => file.path);

    const data = images ? { ...req.body, images } : req.body;

    const result = await FlatService.createFlat(data);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Flat created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFlats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await FlatService.getAllFlats();
    res.status(httpStatus.OK).json({ status: 'success', results: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getSingleFlat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await FlatService.getFlatById(req.params.id);
    if (!result)
      return res.status(httpStatus.NOT_FOUND).json({ status: 'fail', message: 'Flat not found' });
    res.status(httpStatus.OK).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const updateFlat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = (req.files as any)?.map((file: any) => file.path);
    const data = images ? { ...req.body, images } : req.body;

    const result = await FlatService.updateFlat(req.params.id, data);
    if (!result)
      return res.status(httpStatus.NOT_FOUND).json({ status: 'fail', message: 'Flat not found' });

    res
      .status(httpStatus.OK)
      .json({ status: 'success', message: 'Flat updated successfully', data: result });
  } catch (error) {
    next(error);
  }
};

const deleteFlat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flat = await FlatService.getFlatById(req.params.id);
    if (!flat)
      return res.status(httpStatus.NOT_FOUND).json({ status: 'fail', message: 'Flat not found' });

    await FlatService.deleteFlat(req.params.id);
    res.status(httpStatus.OK).json({ status: 'success', message: 'Flat deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const flatController = {
  createFlat,
  getAllFlats,
  getSingleFlat,
  updateFlat,
  deleteFlat,
};
