import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getTask } from '../../../../src/api/task/index.js';

const main = async () => {
  const taskId = process.argv[2];
  if (!taskId) {
    console.error('用法: node dist/task/getTask.mjs <taskId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getTask(taskId);
  console.log(JSON.stringify(result, null, 2));
};

main();
