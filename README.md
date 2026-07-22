## 禅道

禅道项目管理软件是国产的开源免费项目管理软件，专注研发项目管理，内置需求管理、任务管理、bug管理、缺陷管理、用例管理、计划发布等功能。

### 安装技能

```bash
npx skills add ultravires/zendao-skills
```

安装后，Agent 会按技能说明检查当前工作目录的 `.env.local` / `.env`；缺失时会询问禅道 API 地址与账号密码并写入配置，再用 `skills/zendao` 下的 `node dist/...` 脚本调用 API（详见 `SKILL.md`）。

### 开发

修改 `src/` 或 `skills/zendao/scripts/` 后，重新打包再发布：

```bash
pnpm install
pnpm build
```

`pnpm build` 会将 CLI 与依赖打成自包含的 `skills/zendao/dist/**/*.mjs`，并同步 `references/types.ts`。
