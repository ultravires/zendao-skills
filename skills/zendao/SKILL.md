---
name: zendao
description: >-
  Query and manage ZenTao (禅道) programs, products, tasks, bugs, and users via
  bundled CLI scripts. Use when the user mentions 禅道, ZenTao, Zendao, 项目集,
  执行/execution, 任务, Bug, 产品, or needs to list/create/update/delete ZenTao
  entities through this project's API scripts.
---

# 禅道 (ZenTao)

通过本技能自带的 CLI 脚本调用禅道 REST API。不要手写 HTTP 请求；优先执行下方脚本。

脚本相对于本技能根目录（含 `SKILL.md` 的目录）执行。

## 前置条件

1. 已安装 Node.js（建议 18+）
2. 在**当前工作目录**准备 `.env.local` 或 `.env`：

```bash
ZENDAO_API_BASE_URL=https://your-zendao-host/api.php/v1
ZENDAO_ACCOUNT=your-account
ZENDAO_PASSWORD=your-password
# 可选：已有 Token 时可设置（脚本仍会先登录获取 Token）
ZENDAO_TOKEN=
```

## 工作流

1. 确认环境变量已配置
2. 按用户意图选择对应脚本（见下方速查表）
3. 用 `node dist/...` 执行（在技能根目录下，或以绝对路径指向 `dist`）；参数不足时脚本会打印用法
4. 结果为 stdout 上的 JSON；向用户总结关键字段，必要时再跟进查询

**写操作（创建 / 修改 / 删除）前**：确认目标 ID、指派人账号、日期等关键参数；删除任务需先向用户确认。

## 脚本速查

| 场景 | 命令 |
|------|------|
| 获取 Token | `node dist/token/getToken.mjs` |
| 当前用户资料 | `node dist/user/getProfile.mjs` |
| 用户列表 | `node dist/user/getUsers.mjs [page] [limit]` |
| 用户详情 | `node dist/user/getUser.mjs <userId>` |
| 项目集列表 | `node dist/program/getPrograms.mjs [order]` |
| 项目集详情 | `node dist/program/getProgram.mjs <programId>` |
| 产品列表 | `node dist/product/getProducts.mjs` |
| 产品 Bug 列表 | `node dist/bug/getBugs.mjs <productId>` |
| 执行下任务列表 | `node dist/task/getTasks.mjs <executionId>` |
| 任务详情 | `node dist/task/getTask.mjs <taskId>` |
| 创建任务 | `node dist/task/createTask.mjs <executionId> '<jsonBody>'` |
| 修改任务 | `node dist/task/updateTask.mjs <taskId> '<jsonBody>'` |
| 删除任务 | `node dist/task/deleteTask.mjs <taskId>` |

`order` 格式：`字段_asc` / `字段_desc`（默认 `order_asc`）。

## 创建 / 修改任务 JSON

必填（创建）：`name`、`type`、`assignedTo`（账号字符串数组）、`estStarted`、`deadline`。

可选：`module`、`story`、`fromBug`、`pri`、`estimate`。

`type` 取值：`design` | `devel` | `request` | `test` | `study` | `discuss` | `ui` | `affair` | `misc`。

```bash
node dist/task/createTask.mjs 55 '{"name":"实现登录","assignedTo":["admin"],"type":"devel","estStarted":"2026-07-21","deadline":"2026-07-28","pri":2,"estimate":8}'
```

修改任务字段均为可选，传需要更新的子集即可。

## ID 与概念

| 概念 | 说明 |
|------|------|
| program | 项目集 |
| product | 产品；Bug 列表挂在产品下 |
| execution | 执行（迭代/sprint）；任务列表挂在执行下 |
| task | 任务；详情/改删用任务 ID |
| user | 用户；指派用 **account**，不是 realname |

不知道 ID 时：先查列表（products / programs / tasks / users），再对具体 ID 操作。

## 输出约定

- 向用户用中文简要说明结果
- 列表默认突出：`id`、名称/标题、状态、指派人、关键日期
- 完整 JSON 仅在用户需要时再贴出

## 类型参考

请求/响应字段详见 [`references/types.ts`](references/types.ts)。
