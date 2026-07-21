import client from '../client.js';
import type {
  GetProfileResponse,
  GetUserResponse,
  GetUsersParams,
  GetUsersResponse,
} from '../types.js';

/**
 * 获取当前登录用户自身个人信息
 * GET /user
 */
export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await client.get<GetProfileResponse>('/user');
  return response.data;
};

/**
 * 分页获取用户列表
 * GET /users
 */
export const getUsers = async (
  params: GetUsersParams,
): Promise<GetUsersResponse> => {
  const response = await client.get<GetUsersResponse>('/users', { params });
  return response.data;
};

/**
 * 根据用户 ID 获取用户基础信息
 * GET /users/:id
 */
export const getUser = async (
  userId: number | string,
): Promise<GetUserResponse> => {
  const response = await client.get<GetUserResponse>(`/users/${userId}`);
  return response.data;
};
