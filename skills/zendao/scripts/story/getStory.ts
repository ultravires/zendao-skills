import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getStory } from '../../../../src/api/story/index.js';

const main = async () => {
  const storyId = process.argv[2];
  if (!storyId) {
    console.error('用法: node dist/story/getStory.mjs <storyId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getStory(storyId);
  console.log(JSON.stringify(result, null, 2));
};

main();
