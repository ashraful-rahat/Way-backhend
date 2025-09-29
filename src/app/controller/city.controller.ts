import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { CityService } from '../services/city.services';

const createCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('➡️ [DEBUG] Hit /cities/create route');

    console.log('📦 req.body:', req.body);
    console.log('📸 req.file:', req.file);

    // 2. Cloudinary file URL
    const fileUrl = (req.file as any)?.path;
    console.log('🌐 Cloudinary fileUrl:', fileUrl);

    // 3. Prepare data
    const data = fileUrl ? { ...req.body, image: fileUrl } : req.body;
    console.log('📝 Final city data to save:', data);

    // 4. Call service
    const result = await CityService.createCity(data);
    console.log('✅ DB save result:', result);

    // 5. Send response
    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'City created successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('❌ [DEBUG] createCity error:', error);
    next(error);
  }
};

const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CityService.getAllCities();

    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CityService.getCityById(req.params.id);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'City not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const fileUrl = (req.file as any)?.path;

    const data = fileUrl ? { ...req.body, image: fileUrl } : req.body;

    const result = await CityService.updateCity(id, data);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'City not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'City updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const city = await CityService.getCityById(req.params.id);
    if (!city) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'City not found',
      });
    }

    await CityService.deleteCity(req.params.id);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'City deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const cityController = {
  createCity,
  getAllCities,
  getSingleCity,
  updateCity,
  deleteCity,
};
