import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { updateExecution } from '../../../../src/api/execution/index.js';
import type { UpdateExecutionBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/execution/updateExecution.mjs <executionId> '<jsonBody>'";

const main = async () => {
  const executionId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!executionId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/execution/updateExecution.mjs 40 \'{"project":12,"name":"测试执行1","code":"test1","begin":"2021-12-01","end":"2021-12-11","days":10}\'',
    );
    process.exit(1);
  }

  let body: UpdateExecutionBody;
  try {
    body = JSON.parse(bodyRaw) as UpdateExecutionBody;
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

  const result = await updateExecution(executionId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
