import client from '../client.js';

export interface GetTokenResponse {
  token: string;
}

export const getToken = async (
  account: string,
  password: string,
): Promise<GetTokenResponse> => {
  const response = await client.post<GetTokenResponse>('/tokens', {
    account,
    password,
  });
  return response.data;
};
