import axios from 'axios';

const API_BASE_URL = process.env.ZENDAO_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    '缺少 ZENDAO_API_BASE_URL 配置，脚本已退出（不猜测默认地址）。\n' +
      '请配置禅道 REST API 根地址（形如 https://host/api.php/v1），优先级：\n' +
      '  1. 用户 Shell 环境变量（如 ~/.zshrc 中 export ZENDAO_API_BASE_URL=...）\n' +
      '  2. 当前工作目录的 .env.local\n' +
      '  3. 当前工作目录的 .env',
  );
  process.exit(1);
}

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
