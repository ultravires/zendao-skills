import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { createBug } from '../../../../src/api/bug/index.js';
import type { CreateBugBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/bug/createBug.mjs <productId> '<jsonBody>'";

const main = async () => {
  const productId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!productId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/bug/createBug.mjs 1 \'{"title":"Bug2","severity":1,"pri":1,"type":"codeerror","openedBuild":["trunk"]}\'',
    );
    process.exit(1);
  }

  let body: CreateBugBody;
  try {
    body = JSON.parse(bodyRaw) as CreateBugBody;
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

  const result = await createBug(productId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
