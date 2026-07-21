import '../../../src/index.js';
import { getToken } from '../../../src/api/token/index.js';
import { setToken } from '../../../src/api/client.js';
import { getUser } from '../../../src/api/user/index.js';

const main = async () => {
  const userId = process.argv[2];
  if (!userId) {
    console.error('用法: pnpm tsx skills/scripts/user/getUser.ts <userId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getUser(userId);
  console.log(JSON.stringify(result, null, 2));
};

main();
