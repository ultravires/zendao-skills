import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { createProject } from '../../../../src/api/project/index.js';
import type { CreateProjectBody } from '../../../../src/api/types.js';

const usage = "用法: node dist/project/createProject.mjs '<jsonBody>'";

const main = async () => {
  const bodyRaw = process.argv[2];
  if (!bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/project/createProject.mjs \'{"name":"test","code":"test","begin":"2021-01-01","end":"2022-01-01","products":[1]}\'',
    );
    process.exit(1);
  }

  let body: CreateProjectBody;
  try {
    body = JSON.parse(bodyRaw) as CreateProjectBody;
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

  const result = await createProject(body);
  console.log(JSON.stringify(result, null, 2));
};

main();
