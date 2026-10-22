import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getProjectTesttasks } from '../../../../src/api/testtask/index.js';

const main = async () => {
  const projectId = process.argv[2];
  if (!projectId) {
    console.error(
      '用法: node dist/testtask/getProjectTesttasks.mjs <projectId>',
    );
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getProjectTesttasks(projectId);
  console.log(JSON.stringify(result, null, 2));
};

main();
