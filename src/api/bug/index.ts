import client from '../client.js';
import type {
  ActivateBugBody,
  ActivateBugResponse,
  CloseBugBody,
  CloseBugResponse,
  CreateBugBody,
  CreateBugResponse,
  DeleteBugResponse,
  GetBugResponse,
  GetBugsParams,
  GetBugsResponse,
  ResolveBugBody,
  ResolveBugResponse,
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

/**
 * 解决 Bug（body 中的 comment 即解决备注）
 * POST /bugs/:id/resolve
 */
export const resolveBug = async (
  bugId: number | string,
  body: ResolveBugBody,
): Promise<ResolveBugResponse> => {
  const response = await client.post<ResolveBugResponse>(
    `/bugs/${bugId}/resolve`,
    body,
  );
  return response.data;
};

/**
 * 激活 Bug（将已解决的 Bug 重新打开）
 * POST /bugs/:id/active
 * 注意：接口路径是 /active 而非 /activate；对已关闭的 Bug 调用会返回 200 但不生效。
 */
export const activateBug = async (
  bugId: number | string,
  body: ActivateBugBody = {},
): Promise<ActivateBugResponse> => {
  const response = await client.post<ActivateBugResponse>(
    `/bugs/${bugId}/active`,
    body,
  );
  return response.data;
};

/**
 * 关闭 Bug
 * POST /bugs/:id/close
 */
export const closeBug = async (
  bugId: number | string,
  body: CloseBugBody = {},
): Promise<CloseBugResponse> => {
  const response = await client.post<CloseBugResponse>(
    `/bugs/${bugId}/close`,
    body,
  );
  return response.data;
};
