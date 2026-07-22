import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { createTestcase } from '../../../../src/api/testcase/index.js';
import type { CreateTestcaseBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/testcase/createTestcase.mjs <productId> '<jsonBody>'";

const main = async () => {
  const productId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!productId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/testcase/createTestcase.mjs 1 \'{"title":"case1","pri":1,"type":"feature","steps":[{"desc":"步骤1","expect":"结果1"}]}\'',
    );
    process.exit(1);
  }

  let body: CreateTestcaseBody;
  try {
    body = JSON.parse(bodyRaw) as CreateTestcaseBody;
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

  const result = await createTestcase(productId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
