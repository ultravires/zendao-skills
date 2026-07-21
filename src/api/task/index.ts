import client from '../client.js';
import type {
  CreateTaskBody,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTaskResponse,
  GetTasksParams,
  GetTasksResponse,
  UpdateTaskBody,
  UpdateTaskResponse,
} from '../types.js';

/**
 * 根据执行 ID 分页获取对应执行下的任务列表
 * GET /executions/:id/tasks
 */
export const getTasks = async (
  executionId: number | string,
  params?: GetTasksParams,
): Promise<GetTasksResponse> => {
  const response = await client.get<GetTasksResponse>(
    `/executions/${executionId}/tasks`,
    { params },
  );
  return response.data;
};

/**
 * 根据任务 ID 获取单条任务完整详情
 * GET /tasks/:id
 */
export const getTask = async (
  taskId: number | string,
): Promise<GetTaskResponse> => {
  const response = await client.get<GetTaskResponse>(`/tasks/${taskId}`);
  return response.data;
};

/**
 * 在指定执行下新建任务
 * POST /executions/:id/tasks
 */
export const createTask = async (
  executionId: number | string,
  body: CreateTaskBody,
): Promise<CreateTaskResponse> => {
  const response = await client.post<CreateTaskResponse>(
    `/executions/${executionId}/tasks`,
    body,
  );
  return response.data;
};

/**
 * 根据任务 ID 修改任务基础信息
 * PUT /tasks/:id
 */
export const updateTask = async (
  taskId: number | string,
  body: UpdateTaskBody,
): Promise<UpdateTaskResponse> => {
  const response = await client.put<UpdateTaskResponse>(
    `/tasks/${taskId}`,
    body,
  );
  return response.data;
};

/**
 * 根据任务 ID 删除指定任务
 * DELETE /tasks/:id
 */
export const deleteTask = async (
  taskId: number | string,
): Promise<DeleteTaskResponse> => {
  const response = await client.delete<DeleteTaskResponse>(`/tasks/${taskId}`);
  return response.data;
};
