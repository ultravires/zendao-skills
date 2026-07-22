import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { getProject } from '../../../../src/api/project/index.js';

const main = async () => {
  const projectId = process.argv[2];
  if (!projectId) {
    console.error(
      '用法: node dist/project/getProject.mjs <projectId>',
    );
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getProject(projectId);
  console.log(JSON.stringify(result, null, 2));
};

main();
