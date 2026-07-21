import axios from 'axios';

const API_BASE_URL =
  process.env.ZENDAO_API_BASE_URL || 'https://zendao.datagrand.com/api.php/v1';

let authToken: string | undefined = process.env.ZENDAO_TOKEN;

/** 设置认证 Token（优先于环境变量） */
export const setToken = (token: string) => {
  authToken = token;
};

/** 获取当前认证 Token */
export const getAuthToken = () => authToken;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = authToken;
  if (token) {
    config.headers.Token = token;
  }
  return config;
});

export default client;
