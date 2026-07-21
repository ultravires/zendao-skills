import client from '../client.js';
import type { GetBugsParams, GetBugsResponse } from '../types.js';

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
