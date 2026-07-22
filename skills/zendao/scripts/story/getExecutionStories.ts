import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getExecutionStories } from '../../../../src/api/story/index.js';

const main = async () => {
  const executionId = process.argv[2];
  if (!executionId) {
    console.error(
      '用法: node dist/story/getExecutionStories.mjs <executionId> [page] [limit]',
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

  const result = await getExecutionStories(executionId, { page, limit });
  console.log(JSON.stringify(result, null, 2));
};

main();
