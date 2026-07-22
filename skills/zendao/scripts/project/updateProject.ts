import '../../../../src/index.js';
import { getToken } from '../../../../src/api/token/index.js';
import { setToken } from '../../../../src/api/client.js';
import { updateProject } from '../../../../src/api/project/index.js';
import type { UpdateProjectBody } from '../../../../src/api/types.js';

const usage =
  "用法: node dist/project/updateProject.mjs <projectId> '<jsonBody>'";

const main = async () => {
  const projectId = process.argv[2];
  const bodyRaw = process.argv[3];
  if (!projectId || !bodyRaw) {
    console.error(usage);
    console.error(
      '示例: node dist/project/updateProject.mjs 12 \'{"name":"修改项目","PM":"admin"}\'',
    );
    process.exit(1);
  }

  let body: UpdateProjectBody;
  try {
    body = JSON.parse(bodyRaw) as UpdateProjectBody;
  } catch {
    console.error('请求体必须是合法 JSON');
    console.error(usage);
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await updateProject(projectId, body);
  console.log(JSON.stringify(result, null, 2));
};

main();
