import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getTesttask } from '../../../../src/api/testtask/index.js';

const main = async () => {
  const testtaskId = process.argv[2];
  if (!testtaskId) {
    console.error('用法: node dist/testtask/getTesttask.mjs <testtaskId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getTesttask(testtaskId);
  console.log(JSON.stringify(result, null, 2));
};

main();
