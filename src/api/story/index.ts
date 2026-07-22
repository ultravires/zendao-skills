import client from '../client.js';
import type {
  ChangeStoryBody,
  ChangeStoryResponse,
  CreateStoryBody,
  CreateStoryResponse,
  DeleteStoryResponse,
  GetStoriesParams,
  GetStoriesResponse,
  GetStoryResponse,
  UpdateStoryBody,
  UpdateStoryResponse,
} from '../types.js';

/**
 * 根据产品 ID 分页获取对应产品下的需求列表
 * GET /products/:id/stories
 */
export const getProductStories = async (
  productId: number | string,
  params?: GetStoriesParams,
): Promise<GetStoriesResponse> => {
  const response = await client.get<GetStoriesResponse>(
    `/products/${productId}/stories`,
    { params },
  );
  return response.data;
};

/**
 * 根据项目 ID 分页获取对应项目下的需求列表
 * GET /projects/:id/stories
 */
export const getStories = async (
  projectId: number | string,
  params?: GetStoriesParams,
): Promise<GetStoriesResponse> => {
  const response = await client.get<GetStoriesResponse>(
    `/projects/${projectId}/stories`,
    { params },
  );
  return response.data;
};

/**
 * 根据执行 ID 分页获取对应执行下的需求列表
 * GET /executions/:id/stories
 */
export const getExecutionStories = async (
  executionId: number | string,
  params?: GetStoriesParams,
): Promise<GetStoriesResponse> => {
  const response = await client.get<GetStoriesResponse>(
    `/executions/${executionId}/stories`,
    { params },
  );
  return response.data;
};

/**
 * 根据需求 ID 获取单条需求完整详情
 * GET /stories/:id
 */
export const getStory = async (
  storyId: number | string,
): Promise<GetStoryResponse> => {
  const response = await client.get<GetStoryResponse>(`/stories/${storyId}`);
  return response.data;
};

/**
 * 创建需求
 * POST /stories
 */
export const createStory = async (
  body: CreateStoryBody,
): Promise<CreateStoryResponse> => {
  const response = await client.post<CreateStoryResponse>('/stories', body);
  return response.data;
};

/**
 * 变更需求
 * POST /stories/:id/change
 */
export const changeStory = async (
  storyId: number | string,
  body: ChangeStoryBody,
): Promise<ChangeStoryResponse> => {
  const response = await client.post<ChangeStoryResponse>(
    `/stories/${storyId}/change`,
    body,
  );
  return response.data;
};

/**
 * 修改需求其他字段
 * PUT /stories/:id
 */
export const updateStory = async (
  storyId: number | string,
  body: UpdateStoryBody,
): Promise<UpdateStoryResponse> => {
  const response = await client.put<UpdateStoryResponse>(
    `/stories/${storyId}`,
    body,
  );
  return response.data;
};

/**
 * 根据需求 ID 删除指定需求
 * DELETE /stories/:id
 */
export const deleteStory = async (
  storyId: number | string,
): Promise<DeleteStoryResponse> => {
  const response = await client.delete<DeleteStoryResponse>(
    `/stories/${storyId}`,
  );
  return response.data;
};
