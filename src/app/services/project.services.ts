// services/project.service.ts
import { Project, ProjectInput } from '../interfaces/project.interface';
import { ProjectModel } from '../models/project.model';

const createProject = async (data: ProjectInput): Promise<Project> => {
  const project = await ProjectModel.create(data);
  return project.toObject(); // clean object return
};

const getAllProjects = async (): Promise<Project[]> => {
  const result = await ProjectModel.find().sort({ createdAt: -1 }); // latest first
  return result.map((doc) => doc.toObject());
};

const getProjectById = async (id: string): Promise<Project | null> => {
  const result = await ProjectModel.findById(id);
  return result ? result.toObject() : null;
};

const updateProject = async (id: string, data: Partial<ProjectInput>): Promise<Project | null> => {
  const result = await ProjectModel.findByIdAndUpdate(id, data, { new: true });
  return result ? result.toObject() : null;
};

const deleteProject = async (id: string): Promise<Project | null> => {
  const result = await ProjectModel.findByIdAndDelete(id);
  return result ? result.toObject() : null;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
