// controllers/project.controller.ts
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ProjectInput } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.services';

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let mainImage = '';
    if (req.files && (req.files as any).mainImage) {
      mainImage = (req.files as any).mainImage[0].path;
    }

    let galleryImages: string[] = [];
    if (req.files && (req.files as any).galleryImages) {
      galleryImages = (req.files as any).galleryImages.map((f: any) => f.path);
    }

    let amenities: string[] = [];
    if (req.body.amenities) {
      try {
        amenities = JSON.parse(req.body.amenities);
      } catch {
        amenities = req.body.amenities.split(',').map((a: string) => a.trim());
      }
    }

    // 👇 Use ProjectInput type
    const data: ProjectInput = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      cityId: req.body.cityId,
      status: req.body.status,
      isFeatured: req.body.isFeatured === 'true',
      mainImage,
      galleryImages,
      amenities,
    };

    const result = await ProjectService.createProject(data);

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProjectService.getAllProjects();

    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProjectService.getProjectById(req.params.id);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Project not found',
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

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const fileUrl = (req.file as any)?.path;

    const data = fileUrl ? { ...req.body, mainImage: fileUrl } : req.body;

    const result = await ProjectService.updateProject(id, data);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Project not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Project updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Project not found',
      });
    }

    await ProjectService.deleteProject(req.params.id);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const projectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
