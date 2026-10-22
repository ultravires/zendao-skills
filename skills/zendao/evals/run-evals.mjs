#!/usr/bin/env node
/**
 * 触发准确性 eval 的简单 runner（启发式，非 LLM 判定）。
 *
 * 用法：node evals/run-evals.mjs   （在技能根目录或任意 cwd 下以绝对路径执行均可）
 *
 * 判定规则（与 description 的触发词 / 反触发对齐）：
 *   1. 命中反触发词 → false（网页 UI、非禅道工具、报表统计等优先否决）；
 *   2. 命中强触发词（禅道特有概念）→ true；
 *   3. 命中泛实体词（项目/任务/产品/执行）且含操作动词 → true；
 *   4. 否则 → false。
 *
 * 该启发式用于回归兜底：description 改动后跑一遍，若准确率下降说明触发词
 * 被误删。它是下界而非权威判定——最终触发质量仍以人工 / LLM 逐条复核为准。
 * 任何用例失败时退出码为 1。
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const evals = JSON.parse(readFileSync(join(here, 'evals.json'), 'utf8'));

const NEGATIVE = [
  'jira', 'tapd', '飞书', '网页', '页面', '截图', '点一下', '燃尽图',
  '报表', '看板', '会议室', 'review', '代码',
];
const STRONG = [
  '禅道', 'zentao', 'zendao', '项目集', '迭代', 'sprint', '测试单',
  'testtask', '用例', 'bug', 'story', '需求',
];
const CONTEXT = ['项目', '任务', '产品', '执行'];
const ACTION = [
  '建', '创建', '查', '改', '删', '提', '指派', '关闭', '解决', '激活',
  '列表', '进度', '状态',
];

const includesAny = (text, terms) => terms.some((t) => text.includes(t));

const predict = (query) => {
  const q = query.toLowerCase();
  if (includesAny(q, NEGATIVE)) return false;
  if (includesAny(q, STRONG)) return true;
  if (includesAny(q, CONTEXT) && includesAny(q, ACTION)) return true;
  return false;
};

let pass = 0;
for (const item of evals.queries) {
  const got = predict(item.query);
  const ok = got === item.should_trigger;
  if (ok) pass += 1;
  console.log(
    `${ok ? '✅' : '❌'} #${item.id} 期望=${item.should_trigger} 判定=${got}  ${item.query}`,
  );
}

const total = evals.queries.length;
console.log(`\n准确率：${pass}/${total}（${((pass / total) * 100).toFixed(1)}%）`);
if (pass !== total) {
  console.error('存在未通过用例，请核对 description 触发词/反触发后重跑。');
  process.exit(1);
}
