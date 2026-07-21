import '../../../src/index.js';
import { getToken } from '../../../src/api/token/index.js';
import { setToken } from '../../../src/api/client.js';
import { getTasks } from '../../../src/api/task/index.js';

const main = async () => {
  const executionId = process.argv[2];
  if (!executionId) {
    console.error('用法: pnpm tsx skills/scripts/task/getTasks.ts <executionId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getTasks(executionId);
  console.log(JSON.stringify(result, null, 2));
};

main();
