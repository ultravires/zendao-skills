import '../../../src/index.js';
import { getToken } from '../../../src/api/token/index.js';
import { setToken } from '../../../src/api/client.js';
import { updateTask } from '../../../src/api/task/index.js';
import type { UpdateTaskBody } from '../../../src/api/types.js';

const usage =
  "用法: pnpm tsx skills/scripts/task/updateTask.ts <taskId> '<jsonBody>'";

const main = async () => {
  const taskId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!taskId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: pnpm tsx skills/scripts/task/updateTask.ts 13 \'{"name":"testtt","assignedTo":["admin"],"type":"devel","estStarted":"2021-12-01","deadline":"2021-12-31"}\'',
    );
    process.exit(1);
  }

  let body: UpdateTaskBody;
  try {
    body = JSON.parse(bodyRaw) as UpdateTaskBody;
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

  const result = await updateTask(taskId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
