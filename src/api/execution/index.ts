import client from '../client.js';
import type {
  CreateExecutionBody,
  CreateExecutionResponse,
  DeleteExecutionResponse,
  GetExecutionResponse,
  GetExecutionsParams,
  GetExecutionsResponse,
  UpdateExecutionBody,
  UpdateExecutionResponse,
} from '../types.js';

/**
 * 根据项目 ID 分页获取对应项目下的执行列表
 * GET /projects/:id/executions
 */
export const getExecutions = async (
  projectId: number | string,
  params?: GetExecutionsParams,
): Promise<GetExecutionsResponse> => {
  const response = await client.get<GetExecutionsResponse>(
    `/projects/${projectId}/executions`,
    { params },
  );
  return response.data;
};

/**
 * 根据执行 ID 获取执行详情
 * GET /executions/:id
 */
export const getExecution = async (
  executionId: number | string,
): Promise<GetExecutionResponse> => {
  const response = await client.get<GetExecutionResponse>(
    `/executions/${executionId}`,
  );
  return response.data;
};

/**
 * 在指定项目下创建执行
 * POST /projects/:id/executions
 */
export const createExecution = async (
  projectId: number | string,
  body: CreateExecutionBody,
): Promise<CreateExecutionResponse> => {
  const response = await client.post<CreateExecutionResponse>(
    `/projects/${projectId}/executions`,
    body,
  );
  return response.data;
};

/**
 * 修改执行
 * PUT /executions/:id
 */
export const updateExecution = async (
  executionId: number | string,
  body: UpdateExecutionBody,
): Promise<UpdateExecutionResponse> => {
  const response = await client.put<UpdateExecutionResponse>(
    `/executions/${executionId}`,
    body,
  );
  return response.data;
};

/**
 * 根据执行 ID 删除指定执行
 * DELETE /executions/:id
 */
export const deleteExecution = async (
  executionId: number | string,
): Promise<DeleteExecutionResponse> => {
  const response = await client.delete<DeleteExecutionResponse>(
    `/executions/${executionId}`,
  );
  return response.data;
};
