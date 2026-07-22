import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { createProgram } from '../../../../src/api/program/index.js';
import type { CreateProgramBody } from '../../../../src/api/types.js';

const usage = "用法: node dist/program/createProgram.mjs '<jsonBody>'";

const main = async () => {
  const bodyRaw = process.argv[2];
  if (!bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/program/createProgram.mjs \'{"name":"项目集21","begin":"2021-09-11","end":"2021-12-31"}\'',
    );
    process.exit(1);
  }

  let body: CreateProgramBody;
  try {
    body = JSON.parse(bodyRaw) as CreateProgramBody;
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

  const result = await createProgram(body);
  console.log(JSON.stringify(result, null, 2));
};

main();
