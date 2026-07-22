import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getProducts } from '../../../../src/api/product/index.js';

const main = async () => {
  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getProducts();
  console.log(JSON.stringify(result, null, 2));
};

main();
