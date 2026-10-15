import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { activateBug } from '../../../../src/api/bug/index.js';
import type { ActivateBugBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/bug/activateBug.mjs <bugId> ['<jsonBody>']";

const main = async () => {
  const bugId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!bugId) {
    console.error(usage);
    console.error(
      '示例: node dist/bug/activateBug.mjs 1 \'{"assignedTo":"admin","openedBuild":["trunk"],"comment":"激活原因"}\'',
    );
    process.exit(1);
  }

  let body: ActivateBugBody = {};
  if (bodyRaw) {
    try {
      body = JSON.parse(bodyRaw) as ActivateBugBody;
    } catch {
      console.error('请求体必须是合法 JSON');
      console.error(usage);
      process.exit(1);
    }
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await activateBug(bugId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
