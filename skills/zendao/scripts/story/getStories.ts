import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getStories } from '../../../../src/api/story/index.js';

const main = async () => {
  const projectId = process.argv[2];
  if (!projectId) {
    console.error(
      '用法: node dist/story/getStories.mjs <projectId> [page] [limit]',
    );
    process.exit(1);
  }

  const page = process.argv[3] || '1';
  const limit = process.argv[4] || '20';

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getStories(projectId, { page, limit });
  console.log(JSON.stringify(result, null, 2));
};

main();
