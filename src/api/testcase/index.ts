import client from '../client.js';
import type {
  CreateTestcaseBody,
  CreateTestcaseResponse,
  DeleteTestcaseResponse,
  GetTestcaseResponse,
  GetTestcasesParams,
  GetTestcasesResponse,
  UpdateTestcaseBody,
  UpdateTestcaseResponse,
} from '../types.js';

/**
 * 根据产品 ID 分页获取对应产品下的用例列表
 * GET /products/:id/testcases
 */
export const getTestcases = async (
  productId: number | string,
  params?: GetTestcasesParams,
): Promise<GetTestcasesResponse> => {
  const response = await client.get<GetTestcasesResponse>(
    `/products/${productId}/testcases`,
    { params },
  );
  return response.data;
};

/**
 * 根据用例 ID 获取单条用例完整详情
 * GET /testcases/:id
 */
export const getTestcase = async (
  testcaseId: number | string,
): Promise<GetTestcaseResponse> => {
  const response = await client.get<GetTestcaseResponse>(
    `/testcases/${testcaseId}`,
  );
  return response.data;
};

/**
 * 在指定产品下创建用例
 * POST /products/:id/testcases
 */
export const createTestcase = async (
  productId: number | string,
  body: CreateTestcaseBody,
): Promise<CreateTestcaseResponse> => {
  const response = await client.post<CreateTestcaseResponse>(
    `/products/${productId}/testcases`,
    body,
  );
  return response.data;
};

/**
 * 修改用例
 * PUT /testcases/:id
 */
export const updateTestcase = async (
  testcaseId: number | string,
  body: UpdateTestcaseBody,
): Promise<UpdateTestcaseResponse> => {
  const response = await client.put<UpdateTestcaseResponse>(
    `/testcases/${testcaseId}`,
    body,
  );
  return response.data;
};

/**
 * 根据用例 ID 删除指定用例
 * DELETE /testcases/:id
 */
export const deleteTestcase = async (
  testcaseId: number | string,
): Promise<DeleteTestcaseResponse> => {
  const response = await client.delete<DeleteTestcaseResponse>(
    `/testcases/${testcaseId}`,
  );
  return response.data;
};
