import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getExecutions } from '../../../../src/api/execution/index.js';

const main = async () => {
  const projectId = process.argv[2];
  if (!projectId) {
    console.error(
      '用法: node dist/execution/getExecutions.mjs <projectId> [page] [limit]',
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

  const result = await getExecutions(projectId, { page, limit });
  console.log(JSON.stringify(result, null, 2));
};

main();
