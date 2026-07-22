import client from '../client.js';
import type {
  CreateBugBody,
  CreateBugResponse,
  DeleteBugResponse,
  GetBugResponse,
  GetBugsParams,
  GetBugsResponse,
  UpdateBugBody,
  UpdateBugResponse,
} from '../types.js';

/**
 * 根据产品 ID 分页获取对应产品下的 Bug 列表
 * GET /products/:id/bugs
 */
export const getBugs = async (
  productId: number | string,
  params?: GetBugsParams,
): Promise<GetBugsResponse> => {
  const response = await client.get<GetBugsResponse>(
    `/products/${productId}/bugs`,
    { params },
  );
  return response.data;
};

/**
 * 根据 Bug ID 获取单条 Bug 完整详情
 * GET /bugs/:id
 */
export const getBug = async (
  bugId: number | string,
): Promise<GetBugResponse> => {
  const response = await client.get<GetBugResponse>(`/bugs/${bugId}`);
  return response.data;
};

/**
 * 在指定产品下新建 Bug
 * POST /products/:id/bugs
 */
export const createBug = async (
  productId: number | string,
  body: CreateBugBody,
): Promise<CreateBugResponse> => {
  const response = await client.post<CreateBugResponse>(
    `/products/${productId}/bugs`,
    body,
  );
  return response.data;
};

/**
 * 修改 Bug
 * PUT /bugs/:id
 */
export const updateBug = async (
  bugId: number | string,
  body: UpdateBugBody,
): Promise<UpdateBugResponse> => {
  const response = await client.put<UpdateBugResponse>(`/bugs/${bugId}`, body);
  return response.data;
};

/**
 * 根据 Bug ID 删除指定 Bug
 * DELETE /bugs/:id
 */
export const deleteBug = async (
  bugId: number | string,
): Promise<DeleteBugResponse> => {
  const response = await client.delete<DeleteBugResponse>(`/bugs/${bugId}`);
  return response.data;
};
