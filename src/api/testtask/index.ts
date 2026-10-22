import client from '../client.js';
import type {
  GetTesttaskResponse,
  GetTesttasksParams,
  GetTesttasksResponse,
} from '../types.js';

/**
 * 分页获取测试单列表（可按产品、分支筛选）
 * GET /testtasks
 */
export const getTesttasks = async (
  params?: GetTesttasksParams,
): Promise<GetTesttasksResponse> => {
  const response = await client.get<GetTesttasksResponse>('/testtasks', {
    params,
  });
  return response.data;
};

/**
 * 根据项目 ID 获取项目下的测试单列表
 * GET /projects/:id/testtasks
 */
export const getProjectTesttasks = async (
  projectId: number | string,
): Promise<GetTesttasksResponse> => {
  const response = await client.get<GetTesttasksResponse>(
    `/projects/${projectId}/testtasks`,
  );
  return response.data;
};

/**
 * 根据测试单 ID 获取单条测试单完整详情
 * GET /testtasks/:id
 */
export const getTesttask = async (
  testtaskId: number | string,
): Promise<GetTesttaskResponse> => {
  const response = await client.get<GetTesttaskResponse>(
    `/testtasks/${testtaskId}`,
  );
  return response.data;
};
