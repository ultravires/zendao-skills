import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getBugs } from '../../../../src/api/bug/index.js';

const main = async () => {
  const productId = process.argv[2];
  if (!productId) {
    console.error('用法: node dist/bug/getBugs.mjs <productId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getBugs(productId);
  console.log(JSON.stringify(result, null, 2));
};

main();
