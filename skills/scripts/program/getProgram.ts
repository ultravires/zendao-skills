import '../../../src/index.js';
import { getToken } from '../../../src/api/token/index.js';
import { setToken } from '../../../src/api/client.js';
import { getProgram } from '../../../src/api/program/index.js';

const main = async () => {
  const programId = process.argv[2];
  if (!programId) {
    console.error(
      '用法: pnpm tsx skills/scripts/program/getProgram.ts <programId>',
    );
    process.exit(1);
  }

  const { token } = await getToken(
    process.env.ZENDAO_ACCOUNT || '',
    process.env.ZENDAO_PASSWORD || '',
  );
  setToken(token);

  const result = await getProgram(programId);
  console.log(JSON.stringify(result, null, 2));
};

main();
