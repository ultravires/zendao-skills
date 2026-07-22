import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { deleteTestcase } from '../../../../src/api/testcase/index.js';

const main = async () => {
  const testcaseId = process.argv[2];
  if (!testcaseId) {
    console.error('用法: node dist/testcase/deleteTestcase.mjs <testcaseId>');
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await deleteTestcase(testcaseId);
  console.log(JSON.stringify(result, null, 2));
};

main();
