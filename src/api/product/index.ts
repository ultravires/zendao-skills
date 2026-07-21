import client from '../client.js';
import type { GetProductsResponse } from '../types.js';

/**
 * 获取产品列表
 * GET /products
 */
export const getProducts = async (): Promise<GetProductsResponse> => {
  const response = await client.get<GetProductsResponse>('/products');
  return response.data;
};
