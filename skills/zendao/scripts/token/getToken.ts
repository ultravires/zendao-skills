import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';

const main = async () => {
  const token = await getToken(process.env.ZENDAO_ACCOUNT || '', process.env.ZENDAO_PASSWORD || '');
  console.log(token);
};

main();