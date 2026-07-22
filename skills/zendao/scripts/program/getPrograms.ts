import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getPrograms } from '../../../../src/api/program/index.js';

const main = async () => {
  const order = process.argv[2];

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getPrograms(order ? { order } : undefined);
  console.log(JSON.stringify(result, null, 2));
};

main();
