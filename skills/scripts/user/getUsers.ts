import '../../../src/index.js';
import { getToken } from '../../../src/api/token/index.js';
import { setToken } from '../../../src/api/client.js';
import { getUsers } from '../../../src/api/user/index.js';

const main = async () => {
  const page = process.argv[2] || '1';
  const limit = process.argv[3] || '20';

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getUsers({ page, limit });
  console.log(JSON.stringify(result, null, 2));
};

main();
