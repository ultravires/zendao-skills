# 写接口 JSON 模板

> **何时读本文**：需要创建 / 修改 / 变更 / 解决 / 激活 / 关闭禅道实体、要组 `'<jsonBody>'` 参数时。
> 命令速查见 `SKILL.md`；字段的完整类型定义见 `types.ts`（顶部有目录）。

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
