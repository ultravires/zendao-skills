import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getProductStories } from '../../../../src/api/story/index.js';

const main = async () => {
  const productId = process.argv[2];
  if (!productId) {
    console.error(
      '用法: node dist/story/getProductStories.mjs <productId> [page] [limit]',
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

  const result = await getProductStories(productId, { page, limit });
  console.log(JSON.stringify(result, null, 2));
};

main();
