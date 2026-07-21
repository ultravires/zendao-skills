import client from '../client.js';
import type {
  GetProgramResponse,
  GetProgramsParams,
  GetProgramsResponse,
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
