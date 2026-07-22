import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { createStory } from '../../../../src/api/story/index.js';
import type { CreateStoryBody } from '../../../../src/api/types.js';

const usage = "用法: node dist/story/createStory.mjs '<jsonBody>'";

const main = async () => {
  const bodyRaw = process.argv[2];
  if (!bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/story/createStory.mjs \'{"title":"测试需求","spec":"测试","product":1,"pri":1,"category":"feature"}\'',
    );
    process.exit(1);
  }

  let body: CreateStoryBody;
  try {
    body = JSON.parse(bodyRaw) as CreateStoryBody;
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

  const result = await createStory(body);
  console.log(JSON.stringify(result, null, 2));
};

main();
