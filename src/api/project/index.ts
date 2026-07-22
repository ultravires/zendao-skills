import client from '../client.js';
import type {
  CreateProjectBody,
  CreateProjectResponse,
  DeleteProjectResponse,
  GetProjectResponse,
  GetProjectsParams,
  GetProjectsResponse,
  UpdateProjectBody,
  UpdateProjectResponse,
} from '../types.js';

/**
 * 获取项目列表
 * GET /projects
 */
export const getProjects = async (
  params?: GetProjectsParams,
): Promise<GetProjectsResponse> => {
  const response = await client.get<GetProjectsResponse>('/projects', {
    params,
  });
  return response.data;
};

/**
 * 根据项目 ID 获取项目详情
 * GET /projects/:id
 */
export const getProject = async (
  projectId: number | string,
): Promise<GetProjectResponse> => {
  const response = await client.get<GetProjectResponse>(
    `/projects/${projectId}`,
  );
  return response.data;
};

/**
 * 创建项目
 * POST /projects
 */
export const createProject = async (
  body: CreateProjectBody,
): Promise<CreateProjectResponse> => {
  const response = await client.post<CreateProjectResponse>('/projects', body);
  return response.data;
};

/**
 * 修改项目
 * PUT /projects/:id
 */
export const updateProject = async (
  projectId: number | string,
  body: UpdateProjectBody,
): Promise<UpdateProjectResponse> => {
  const response = await client.put<UpdateProjectResponse>(
    `/projects/${projectId}`,
    body,
  );
  return response.data;
};

/**
 * 根据项目 ID 删除指定项目
 * DELETE /projects/:id
 */
export const deleteProject = async (
  projectId: number | string,
): Promise<DeleteProjectResponse> => {
  const response = await client.delete<DeleteProjectResponse>(
    `/projects/${projectId}`,
  );
  return response.data;
};
