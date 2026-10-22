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

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status: number | undefined = error.response?.status;
    const data = error.response?.data;
    const detail =
      data == null ? '' : typeof data === 'string' ? data : JSON.stringify(data);
    if (status) {
      console.error(`⚠ 禅道 API 请求失败：HTTP ${status}${detail ? `，响应：${detail}` : ''}`);
    } else {
      console.error(
        `⚠ 网络层错误：${error.message}（请检查 ZENDAO_API_BASE_URL 是否可达、是否需要内网 / VPN）`,
      );
    }
    process.exit(1);
  },
);

export default client;
