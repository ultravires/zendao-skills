---
name: zendao
description: >-
  Query and manage ZenTao (禅道) programs, projects, products, stories,
  tasks, bugs, testcases, and users via bundled CLI scripts. Use when the user
  mentions 禅道, ZenTao, Zendao, 项目集, 项目, 执行/execution, 需求/story, 任务,
  Bug, 用例, 测试用例, 产品, or needs to list/create/update/delete ZenTao
  entities through this project's API scripts.
---

# 禅道 (ZenTao)

通过本技能自带的 CLI 脚本调用禅道 REST API。不要手写 HTTP 请求；优先执行下方脚本。

脚本相对于本技能根目录（含 `SKILL.md` 的目录）执行。

## 前置条件

已安装 Node.js（建议 18+）。脚本从**当前工作目录**读取 `.env.local` 或 `.env`（不是技能目录）。

## 首次配置（缺失时必做）

在执行任何业务脚本前，先完成下列检查；配置缺失时不要猜测默认地址或账号，必须先引导用户写好文件。

1. **检查**：在 cwd 查找 `.env.local` 或 `.env`，确认至少具备：
   - `ZENDAO_API_BASE_URL`（禅道 REST API 根路径，形如 `https://host/api.php/v1`）
   - `ZENDAO_ACCOUNT` + `ZENDAO_PASSWORD`（或已可用的 `ZENDAO_TOKEN`）
2. **询问**：若文件不存在或必填项为空，向用户索取 API 地址、账号、密码（Token 可选）。不要在回复中回显密码。
3. **写入**：在 cwd 创建或更新 `.env.local`（优先于 `.env`）：

```bash
ZENDAO_API_BASE_URL=https://your-zendao-host/api.php/v1
ZENDAO_ACCOUNT=your-account
ZENDAO_PASSWORD=your-password
# 可选：已有 Token 时可设置（脚本仍会先登录获取 Token）
ZENDAO_TOKEN=
```

4. **验证**：执行 `node dist/token/getToken.mjs`（在技能根目录下，或以绝对路径指向该文件）。成功后再继续业务操作；失败则请用户核对地址与账号后重试。
5. **安全**：提醒用户勿将 `.env` / `.env.local` 提交到 Git；凭证只写本地文件。

## 工作流

1. 按「首次配置」确认环境可用（已配置则跳过询问）
2. 按用户意图选择对应脚本（见下方速查表）
3. 用 `node dist/...` 执行（在技能根目录下，或以绝对路径指向 `dist`）；参数不足时脚本会打印用法
4. 结果为 stdout 上的 JSON；向用户总结关键字段，必要时再跟进查询

**写操作（创建 / 修改 / 删除）前**：确认目标 ID、指派人账号、日期等关键参数；删除任务 / 需求 / 项目 / 项目集需先向用户确认。

## 脚本速查

| 场景 | 命令 |
|------|------|
| 获取 Token | `node dist/token/getToken.mjs` |
| 当前用户资料 | `node dist/user/getProfile.mjs` |
| 用户列表 | `node dist/user/getUsers.mjs [page] [limit]` |
| 用户详情 | `node dist/user/getUser.mjs <userId>` |
| 项目集列表 | `node dist/program/getPrograms.mjs [order]` |
| 项目集详情 | `node dist/program/getProgram.mjs <programId>` |
| 创建项目集 | `node dist/program/createProgram.mjs '<jsonBody>'` |
| 修改项目集 | `node dist/program/updateProgram.mjs <programId> '<jsonBody>'` |
| 删除项目集 | `node dist/program/deleteProgram.mjs <programId>` |
| 项目列表 | `node dist/project/getProjects.mjs [page] [limit]` |
| 项目详情 | `node dist/project/getProject.mjs <projectId>` |
| 创建项目 | `node dist/project/createProject.mjs '<jsonBody>'` |
| 修改项目 | `node dist/project/updateProject.mjs <projectId> '<jsonBody>'` |
| 删除项目 | `node dist/project/deleteProject.mjs <projectId>` |
| 产品需求列表 | `node dist/story/getProductStories.mjs <productId> [page] [limit]` |
| 项目需求列表 | `node dist/story/getStories.mjs <projectId> [page] [limit]` |
| 执行需求列表 | `node dist/story/getExecutionStories.mjs <executionId> [page] [limit]` |
| 需求详情 | `node dist/story/getStory.mjs <storyId>` |
| 创建需求 | `node dist/story/createStory.mjs '<jsonBody>'` |
| 变更需求 | `node dist/story/changeStory.mjs <storyId> '<jsonBody>'` |
| 修改需求 | `node dist/story/updateStory.mjs <storyId> '<jsonBody>'` |
| 删除需求 | `node dist/story/deleteStory.mjs <storyId>` |
| 项目执行列表 | `node dist/execution/getExecutions.mjs <projectId> [page] [limit]` |
| 执行详情 | `node dist/execution/getExecution.mjs <executionId>` |
| 创建执行 | `node dist/execution/createExecution.mjs <projectId> '<jsonBody>'` |
| 修改执行 | `node dist/execution/updateExecution.mjs <executionId> '<jsonBody>'` |
| 删除执行 | `node dist/execution/deleteExecution.mjs <executionId>` |
| 产品列表 | `node dist/product/getProducts.mjs` |
| 产品用例列表 | `node dist/testcase/getTestcases.mjs <productId> [page] [limit]` |
| 用例详情 | `node dist/testcase/getTestcase.mjs <testcaseId>` |
| 创建用例 | `node dist/testcase/createTestcase.mjs <productId> '<jsonBody>'` |
| 修改用例 | `node dist/testcase/updateTestcase.mjs <testcaseId> '<jsonBody>'` |
| 删除用例 | `node dist/testcase/deleteTestcase.mjs <testcaseId>` |
| 产品 Bug 列表 | `node dist/bug/getBugs.mjs <productId>` |
| Bug 详情 | `node dist/bug/getBug.mjs <bugId>` |
| 创建 Bug | `node dist/bug/createBug.mjs <productId> '<jsonBody>'` |
| 修改 Bug | `node dist/bug/updateBug.mjs <bugId> '<jsonBody>'` |
| 删除 Bug | `node dist/bug/deleteBug.mjs <bugId>` |
| 解决 Bug | `node dist/bug/resolveBug.mjs <bugId> '<jsonBody>'` |
| 激活 Bug | `node dist/bug/activateBug.mjs <bugId> ['<jsonBody>']` |
| 关闭 Bug | `node dist/bug/closeBug.mjs <bugId> ['<jsonBody>']` |
| 执行下任务列表 | `node dist/task/getTasks.mjs <executionId>` |
| 任务详情 | `node dist/task/getTask.mjs <taskId>` |
| 创建任务 | `node dist/task/createTask.mjs <executionId> '<jsonBody>'` |
| 修改任务 | `node dist/task/updateTask.mjs <taskId> '<jsonBody>'` |
| 删除任务 | `node dist/task/deleteTask.mjs <taskId>` |

`order` 格式：`字段_asc` / `字段_desc`（默认 `order_asc`）。

## 创建项目集 JSON

字段均为可选。

可选：`name`、`parent`（父项目集，`0` 表示无）、`PM`、`budget`、`budgetUnit`（`CNY` | `USD`）、`desc`、`begin`、`end`、`acl`（`open` | `private`）、`whitelist`（仅 `acl = private` 时生效）。

```bash
node dist/program/createProgram.mjs '{"name":"项目集21","begin":"2021-09-11","end":"2021-12-31"}'
```

## 修改项目集 JSON

字段均为可选，传需要更新的子集即可。

可选：`name`、`parent`（父项目集，`0` 表示无）、`PM`、`budget`、`budgetUnit`（`CNY` | `USD`）、`desc`、`begin`、`end`、`acl`（`open` | `private`）、`whitelist`。

```bash
node dist/program/updateProgram.mjs 12 '{"name":"项目集","PM":"admin"}'
```

## 创建项目 JSON

必填：`name`、`code`、`begin`、`end`、`products`（产品 ID 数组，不能为空）。

可选：`model`（默认 `scrum`）、`parent`（所属项目集，默认 `0`）。

`model` 取值：`scrum` | `waterfall`。

```bash
node dist/project/createProject.mjs '{"name":"test","code":"test","begin":"2021-01-01","end":"2022-01-01","products":[1]}'
```

## 修改项目 JSON

字段均为可选，传需要更新的子集即可。

可选：`name`、`code`、`parent`、`PM`、`budget`、`budgetUnit`（`CNY` | `USD`）、`days`、`desc`、`acl`（`open` | `private`）、`whitelist`、`auth`（`extend` | `reset`）。

```bash
node dist/project/updateProject.mjs 12 '{"name":"修改项目","PM":"admin"}'
```

## 创建执行 JSON

必填：`name`、`code`、`begin`、`end`。

可选：`days`、`lifetime`（`short` | `long` | `ops`）、`PO`、`PM`、`QD`、`RD`、`teamMembers`（账号字符串数组）、`desc`、`acl`（`private` | `open`）、`whitelist`。

```bash
node dist/execution/createExecution.mjs 12 '{"name":"测试执行1","code":"test1","begin":"2021-12-01","end":"2021-12-11","days":10}'
```

## 修改执行 JSON

必填：`project`、`name`、`code`、`begin`、`end`。

可选：`days`、`lifetime`（`short` | `long` | `ops`）、`PO`、`PM`、`QD`、`RD`、`teamMembers`（账号字符串数组）、`desc`、`acl`（`private` | `open`）、`whitelist`。

```bash
node dist/execution/updateExecution.mjs 40 '{"project":12,"name":"测试执行1","code":"test1","begin":"2021-12-01","end":"2021-12-11","days":10}'
```

## 创建需求 JSON

必填：`title`、`product`、`pri`、`category`。

可选：`spec`（需求描述）、`verify`（验收标准）、`source`、`sourceNote`、`estimate`、`keywords`。

`category` 取值：`feature` | `interface` | `performance` | `safe` | `experience` | `improve` | `other`。

`source` 取值：`customer` | `user` | `po` | `market`。

```bash
node dist/story/createStory.mjs '{"title":"测试需求","spec":"测试","product":1,"pri":1,"category":"feature"}'
```

## 变更需求 JSON

字段均为可选，传需要变更的子集即可。

可选：`title`、`spec`（需求描述）、`verify`（验收标准）。

```bash
node dist/story/changeStory.mjs 1 '{"spec":"变更描述"}'
```

## 修改需求 JSON

字段均为可选，传需要更新的子集即可。与「变更需求」不同，本接口修改模块、来源、优先级等其他字段。

可选：`module`、`source`、`sourceNote`、`pri`、`category`、`estimate`、`keywords`。

`category` 取值：`feature` | `interface` | `performance` | `safe` | `experience` | `improve` | `other`。

`source` 取值：`customer` | `user` | `po` | `market`。

```bash
node dist/story/updateStory.mjs 14 '{"category":"other"}'
```

## 创建 / 修改任务 JSON

必填（创建）：`name`、`type`、`assignedTo`（账号字符串数组）、`estStarted`、`deadline`。

可选：`module`、`story`、`fromBug`、`pri`、`estimate`。

`type` 取值：`design` | `devel` | `request` | `test` | `study` | `discuss` | `ui` | `affair` | `misc`。

```bash
node dist/task/createTask.mjs 55 '{"name":"实现登录","assignedTo":["admin"],"type":"devel","estStarted":"2026-07-21","deadline":"2026-07-28","pri":2,"estimate":8}'
```

修改任务字段均为可选，传需要更新的子集即可。

## 创建 / 修改用例 JSON

必填（创建）：`title`、`type`、`steps`（步骤数组，每项含 `desc`、`expect`）。

可选：`branch`、`module`、`story`、`stage`、`precondition`、`pri`、`keywords`。

`type` 取值：`feature` | `performance` | `config` | `install` | `security` | `interface` | `unit` | `other`。

`stage` 取值：`unittest` | `feature` | `intergrate` | `system` | `smoke` | `bvt`。

```bash
node dist/testcase/createTestcase.mjs 1 '{"title":"case1","pri":1,"type":"feature","steps":[{"desc":"步骤1","expect":"结果1"}]}'
```

修改用例字段均为可选，传需要更新的子集即可。

```bash
node dist/testcase/updateTestcase.mjs 9 '{"title":"case1","pri":1,"type":"feature","steps":[{"desc":"步骤1","expect":"结果1"}]}'
```

## 创建 / 修改 Bug JSON

必填：`title`、`severity`、`pri`、`type`。

可选：`branch`、`module`、`execution`、`keywords`、`os`、`browser`、`steps`、`task`、`story`、`deadline`、`openedBuild`（影响版本字符串数组）。

`type` 取值：`codeerror` | `config` | `install` | `security` | `performance` | `standard` | `automation` | `designdefect` | `others`。

```bash
node dist/bug/createBug.mjs 1 '{"title":"Bug2","severity":1,"pri":1,"type":"codeerror","steps":"","openedBuild":["trunk"]}'
node dist/bug/updateBug.mjs 1 '{"title":"Bug2","severity":1,"pri":1,"type":"codeerror","openedBuild":["trunk"]}'
```

## 解决 / 激活 / 关闭 Bug JSON

**解决 Bug**：必填 `resolution`；可选 `resolvedBuild`（解决版本，如 `"trunk"`）、`comment`（备注，会挂在 resolved 历史记录下，常用于填写问题原因）、`assignedTo`（指派账号）、`duplicateBug`（重复 Bug ID，仅 `resolution = duplicate` 时）。

`resolution` 取值：`fixed`（已解决） | `notrepro`（无法重现） | `duplicate`（重复 Bug） | `bydesign`（设计如此） | `willnotfix`（不予解决） | `tostory`（转为需求） | `postponed`（延期处理） | `external`（外部原因）。

```bash
node dist/bug/resolveBug.mjs 1 '{"resolution":"fixed","resolvedBuild":"trunk","comment":"问题原因与修复说明"}'
```

**激活 Bug**：字段均可选，不传 body 也可。可选 `assignedTo`（指派账号）、`openedBuild`（影响版本字符串数组）、`comment`（激活备注）。

```bash
node dist/bug/activateBug.mjs 1 '{"assignedTo":"admin","openedBuild":["trunk"],"comment":"激活原因"}'
```

**关闭 Bug**：字段均可选，不传 body 也可。可选 `comment`（关闭备注）。

```bash
node dist/bug/closeBug.mjs 1 '{"comment":"验证通过，关闭"}'
```

> 注意：解决 / 激活 / 关闭均为即时生效的写操作，执行前确认 Bug ID 与备注内容无误；每次调用都会新增一条对应的历史记录。

## ID 与概念

| 概念 | 说明 |
|------|------|
| program | 项目集 |
| project | 项目；创建时需关联至少一个 product |
| product | 产品；Bug / 用例 / 需求列表与创建挂在产品下 |
| story | 需求；创建时 body 需含 product；列表可挂在产品、项目或执行下，详情/变更/删除用需求 ID |
| execution | 执行（迭代/sprint）；创建挂在项目下，任务/需求列表挂在执行下 |
| task | 任务；详情/改删用任务 ID |
| bug | Bug；创建挂在产品下，详情/改删/解决/激活/关闭用 Bug ID |
| testcase | 用例；创建挂在产品下，详情/修改/删除用用例 ID |
| user | 用户；指派用 **account**，不是 realname |

不知道 ID 时：先查列表（products / programs / projects / stories / tasks / users），再对具体 ID 操作。

## 输出约定

- 向用户用中文简要说明结果
- 列表默认突出：`id`、名称/标题、状态、指派人、关键日期
- 完整 JSON 仅在用户需要时再贴出

## 类型参考

请求/响应字段详见 [`references/types.ts`](references/types.ts)。
