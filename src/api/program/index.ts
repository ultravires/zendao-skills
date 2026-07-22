import client from '../client.js';
import type {
  CreateProgramBody,
  CreateProgramResponse,
  DeleteProgramResponse,
  GetProgramResponse,
  GetProgramsParams,
  GetProgramsResponse,
  UpdateProgramBody,
  UpdateProgramResponse,
} from '../types.js';

/**
 * 获取项目集列表
 * GET /programs
 */
export const getPrograms = async (
  params?: GetProgramsParams,
): Promise<GetProgramsResponse> => {
  const response = await client.get<GetProgramsResponse>('/programs', {
    params,
  });
  return response.data;
};

/**
 * 根据项目集 ID 获取项目集详情
 * GET /programs/:id
 */
export const getProgram = async (
  programId: number | string,
): Promise<GetProgramResponse> => {
  const response = await client.get<GetProgramResponse>(
    `/programs/${programId}`,
  );
  return response.data;
};

/**
 * 创建项目集
 * POST /programs
 */
export const createProgram = async (
  body: CreateProgramBody,
): Promise<CreateProgramResponse> => {
  const response = await client.post<CreateProgramResponse>('/programs', body);
  return response.data;
};

/**
 * 修改项目集
 * PUT /programs/:id
 */
export const updateProgram = async (
  programId: number | string,
  body: UpdateProgramBody,
): Promise<UpdateProgramResponse> => {
  const response = await client.put<UpdateProgramResponse>(
    `/programs/${programId}`,
    body,
  );
  return response.data;
};

/**
 * 根据项目集 ID 删除指定项目集
 * DELETE /programs/:id
 */
export const deleteProgram = async (
  programId: number | string,
): Promise<DeleteProgramResponse> => {
  const response = await client.delete<DeleteProgramResponse>(
    `/programs/${programId}`,
  );
  return response.data;
};
