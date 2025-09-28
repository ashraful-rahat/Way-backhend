// controllers/project.controller.ts
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ProjectService } from '../services/project.services';

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileUrl = (req.file as any)?.path; // multer-storage-cloudinary URL

    const data = fileUrl ? { ...req.body, mainImage: fileUrl } : req.body;

    const result = await ProjectService.createProject(data);

    res.status(httpStatus.CREATED).json({
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
