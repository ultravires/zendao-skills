import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getTesttasks } from '../../../../src/api/testtask/index.js';

const main = async () => {
  const page = process.argv[2] || '1';
  const limit = process.argv[3] || '20';
  const order = process.argv[4];
  const product = process.argv[5];
  const branch = process.argv[6];

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getTesttasks({
    page,
    limit,
    ...(order ? { order } : {}),
    ...(product ? { product } : {}),
    ...(branch ? { branch } : {}),
  });
  console.log(JSON.stringify(result, null, 2));
};

main();
