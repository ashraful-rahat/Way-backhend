// services/project.service.ts
import { Project } from '../interfaces/project.interface';
import { ProjectModel } from '../models/project.model';

const createProject = async (data: Project) => {
  return await ProjectModel.create(data);
};

const getAllProjects = async () => {
  const result = await ProjectModel.find();
  // latest first
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const getProjectById = async (id: string) => {
  return await ProjectModel.findById(id);
};

const updateProject = async (id: string, data: Partial<Project>) => {
  return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteProject = async (id: string) => {
  return await ProjectModel.findByIdAndDelete(id);
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
