import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { resolveBug } from '../../../../src/api/bug/index.js';
import type { ResolveBugBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/bug/resolveBug.mjs <bugId> '<jsonBody>'";

const main = async () => {
  const bugId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!bugId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/bug/resolveBug.mjs 1 \'{"resolution":"fixed","resolvedBuild":"trunk","comment":"问题原因与修复说明"}\'',
    );
    console.error(
      'resolution 取值: fixed(已解决) | notrepro(无法重现) | duplicate(重复Bug) | bydesign(设计如此) | willnotfix(不予解决) | tostory(转为需求) | postponed(延期处理) | external(外部原因)',
    );
    process.exit(1);
  }

  let body: ResolveBugBody;
  try {
    body = JSON.parse(bodyRaw) as ResolveBugBody;
  } catch {
    console.error('请求体必须是合法 JSON');
    console.error(usage);
    process.exit(1);
  }
  if (!body.resolution) {
    console.error('缺少必填字段 resolution');
    console.error(usage);
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await resolveBug(bugId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
