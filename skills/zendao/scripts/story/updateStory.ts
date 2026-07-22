import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { updateStory } from '../../../../src/api/story/index.js';
import type { UpdateStoryBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/story/updateStory.mjs <storyId> '<jsonBody>'";

const main = async () => {
  const storyId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!storyId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/story/updateStory.mjs 14 \'{"category":"other"}\'',
    );
    process.exit(1);
  }

  let body: UpdateStoryBody;
  try {
    body = JSON.parse(bodyRaw) as UpdateStoryBody;
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

  const result = await updateStory(storyId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
