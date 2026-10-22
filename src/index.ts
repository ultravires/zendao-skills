import { config } from 'dotenv';

/**
 * 禅道配置加载入口。
 *
 * 环境变量优先级（从高到低）：
 * 1. 用户 Shell 环境变量（如 ~/.zshrc 中 export 的 ZENDAO_*），适合全局生效；
 * 2. 当前工作目录下的 .env.local（本地私有配置，不入 Git）；
 * 3. 当前工作目录下的 .env（项目级默认配置）。
 *
 * 说明：dotenv 默认不会覆盖 process.env 中已存在的变量，
 * 因此 Shell 环境变量天然优先于 .env 文件，无需额外处理。
 */
config({ path: ['.env.local', '.env'] });
