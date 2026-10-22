---
name: zendao
version: 1.1.0
description: >-
  Query and manage ZenTao (禅道) programs, projects, products, stories,
  tasks, bugs, testcases and users, plus read-only testtask queries, via
  bundled CLI scripts. Use when the user mentions 禅道, ZenTao, Zendao,
  项目集, 项目, 执行/execution, 迭代/sprint, 需求/story, 任务, Bug, 用例,
  测试用例, 测试单/testtask, 产品, or needs to list/create/update/delete
  ZenTao entities through this project's API scripts. Not for ZenTao web
  UI automation (页面点击/截图), report or metrics dashboards (报表/度量统计),
  or non-ZenTao project tools such as Jira, TAPD or 飞书项目.
---

# 禅道 (ZenTao)

通过本技能自带的 CLI 脚本调用禅道 REST API。不要手写 HTTP 请求；优先执行下方脚本。

脚本相对于本技能根目录（含 `SKILL.md` 的目录）执行。

## 何时不要用

- **禅道网页 UI 操作**（在禅道页面里点击、填表、截图）→ 本技能只走 REST API，请改用浏览器自动化类技能。
- **非禅道的项目管理工具**（Jira、TAPD、飞书项目等）→ 不触发。
- **报表 / 度量统计**（燃尽图、工时汇总、质量看板）→ 本技能只覆盖实体查询与 CRUD，无统计接口。
- **创建 / 修改测试单（testtask）与用户（user）** → 测试单为只读接口，用户仅支持查询；请引导用户在禅道页面操作。

## 前置条件

已安装 Node.js（建议 18+）。配置按以下优先级读取：**用户 Shell 环境变量（如 `~/.zshrc` 中 export 的 `ZENDAO_*`）> 当前工作目录的 `.env.local` > 当前工作目录的 `.env`**（注意：`.env` 文件从 cwd 读取，不是技能目录）。

未配置 `ZENDAO_API_BASE_URL` 时脚本会直接报错退出，不会访问任何默认地址。

## 首次配置（缺失时必做）

在执行任何业务脚本前，先完成下列检查；配置缺失时不要猜测默认地址或账号，必须先引导用户写好配置。

1. **检查**：先检查 Shell 环境变量（`env | grep ZENDAO`），再在 cwd 查找 `.env.local` 或 `.env`，确认至少具备：
   - `ZENDAO_API_BASE_URL`（禅道 REST API 根路径，形如 `https://host/api.php/v1`）
   - `ZENDAO_ACCOUNT` + `ZENDAO_PASSWORD`（或已可用的 `ZENDAO_TOKEN`）
2. **询问**：若配置不存在或必填项为空，向用户索取 API 地址、账号、密码（Token 可选）。不要在回复中回显密码。
3. **写入**（二选一，优先推荐用户级环境变量）：
   - **用户级（推荐，全局生效）**：在用户的 Shell 配置（如 `~/.zshrc`）中追加：

```bash
# 禅道 (ZenTao) API 配置
export ZENDAO_API_BASE_URL="https://your-zendao-host/api.php/v1"  # REST API 根地址
export ZENDAO_ACCOUNT="your-account"                               # 登录账号
export ZENDAO_PASSWORD="your-password"                             # 登录密码
export ZENDAO_TOKEN=""                                             # 可选：已有 Token 时直接复用
```

   - **项目级（仅当前目录生效）**：在 cwd 创建或更新 `.env.local`（优先于 `.env`）：

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

**组 JSON body 时**：必读 [`references/json-templates.md`](references/json-templates.md)，其中有每个写接口的必填 / 可选字段、枚举取值与可运行示例。

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
| 测试单列表 | `node dist/testtask/getTesttasks.mjs [page] [limit] [order] [productId] [branch]` |
| 项目测试单列表 | `node dist/testtask/getProjectTesttasks.mjs <projectId>` |
| 测试单详情 | `node dist/testtask/getTesttask.mjs <testtaskId>` |
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

## 测试单（只读）

测试单仅有列表 / 项目下列表 / 详情三个只读接口，无创建、修改、删除能力，不要尝试。

`status` 取值：`wait`（未开始） | `doing`（进行中） | `done`（已关闭） | `blocked`（被阻塞）。

`type` 取值：`integrate`（集成测试） | `system`（系统测试） | `acceptance`（验收测试） | `performance`（性能测试） | `safety`（安全测试） | `smoke`（冒烟测试）。

详情响应额外包含 `testcases`：关联用例及其执行指派（`assignedTo`）、最近执行结果（`lastRunResult`）等。

```bash
node dist/testtask/getTesttasks.mjs 1 20 id_desc 135   # 按产品筛选
node dist/testtask/getProjectTesttasks.mjs 142
node dist/testtask/getTesttask.mjs 615
```

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
| testtask | 测试单（只读）；列表可按产品/分支筛选或挂在项目下，详情（含关联用例执行情况）用测试单 ID |
| user | 用户（只读）；指派用 **account**，不是 realname |

不知道 ID 时：先查列表（products / programs / projects / stories / tasks / users），再对具体 ID 操作。

## 输出约定

- 向用户用中文简要说明结果
- 列表默认突出：`id`、名称/标题、状态、指派人、关键日期
- 完整 JSON 仅在用户需要时再贴出

## 参考资料

- **组写接口 JSON body 时** → [`references/json-templates.md`](references/json-templates.md)：每个创建 / 修改 / 状态流转接口的必填字段、枚举取值与可运行示例。
- **查请求 / 响应字段结构时** → [`references/types.ts`](references/types.ts)：完整类型定义，文件顶部有按实体分组的目录索引。
