import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getBug } from '../../../../src/api/bug/index.js';

const main = async () => {
  const bugId = process.argv[2];
  if (!bugId) {
    console.error('用法: node dist/bug/getBug.mjs <bugId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getBug(bugId);
  console.log(JSON.stringify(result, null, 2));
};

main();
