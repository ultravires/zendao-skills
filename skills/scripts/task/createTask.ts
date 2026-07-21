import '../../../src/index.js';
import { getToken } from '../../../src/api/token/index.js';
import { setToken } from '../../../src/api/client.js';
import { createTask } from '../../../src/api/task/index.js';
import type { CreateTaskBody } from '../../../src/api/types.js';

const usage =
  '用法: pnpm tsx skills/scripts/task/createTask.ts <executionId> \'<jsonBody>\'';

const main = async () => {
  const executionId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!executionId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: pnpm tsx skills/scripts/task/createTask.ts 55 \'{"name":"test","assignedTo":["admin"],"type":"devel","estStarted":"2021-12-01","deadline":"2021-12-31"}\'',
    );
    process.exit(1);
  }

  let body: CreateTaskBody;
  try {
    body = JSON.parse(bodyRaw) as CreateTaskBody;
  } catch {
    console.error('请求体必须是合法 JSON');
    console.error(usage);
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await createTask(executionId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
