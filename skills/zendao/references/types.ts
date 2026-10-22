/** 禅道用户对象（任务等接口中嵌套的精简用户信息） */
export interface ZenTaoUser {
  id: number;
  account: string;
  avatar: string;
  realname: string;
}

/** 用户类型 */
export type UserType = 'inside' | 'outside';

/** 用户性别 */
export type UserGender = 'f' | 'm';

/** 用户角色 */
export interface UserRole {
  code: string;
  name: string;
}

/** 根据 ID 查询的用户基础信息 */
export interface User {
  id: number;
  company: number;
  type: UserType;
  dept: number;
  account: string;
  role: string;
  realname: string;
  nickname: string;
  commiter: string;
  avatar: string;
  birthday: string;
  gender: UserGender | '';
  email: string;
  skype: string;
  qq: string;
  mobile: string;
  phone: string;
  weixin: string;
  dingding: string;
  slack: string;
  whatsapp: string;
  address: string;
  zipcode: string;
  nature: string;
  analysis: string;
  strategy: string;
  join: string;
  visits: number;
  ip: string;
  last: string;
  fails: number;
  locked: string;
  ranzhi: string;
  score: number;
  scoreLevel: number;
  deleted: string;
}

/** 根据用户 ID 获取用户信息响应 */
export type GetUserResponse = User;

/** 当前登录用户个人信息 */
export interface UserProfile {
  id: number;
  company: number;
  type: UserType;
  dept: number;
  account: string;
  role: UserRole;
  realname: string;
  nickname: string;
  commiter: string;
  avatar: string;
  birthday: string | null;
  gender: UserGender | '';
  email: string;
  skype: string;
  qq: string;
  mobile: string;
  phone: string;
  weixin: string;
  dingding: string;
  slack: string;
  whatsapp: string;
  address: string;
  zipcode: string;
  nature: string;
  analysis: string;
  strategy: string;
  join: string | null;
  visits: number;
  ip: string;
  last: string;
  fails: number;
  locked: string | null;
  ranzhi: string;
  score: number;
  scoreLevel: number;
  deleted: string;
  admin: boolean;
}

/** 获取我的个人信息响应 */
export interface GetProfileResponse {
  profile: UserProfile;
}

/** 用户列表中的精简用户信息 */
export interface UserListItem {
  id: number;
  dept: number;
  account: string;
  realname: string;
  role?: string;
  email?: string;
}

/** 获取用户列表查询参数 */
export interface GetUsersParams {
  page: number | string;
  limit: number | string;
}

/** 获取用户列表响应 */
export interface GetUsersResponse {
  page: number;
  total: number;
  limit: number;
  users: UserListItem[];
}

/** 任务类型 */
export type TaskType =
  | 'design'
  | 'devel'
  | 'request'
  | 'test'
  | 'study'
  | 'discuss'
  | 'ui'
  | 'affair'
  | 'misc';

/** 任务状态 */
export type TaskStatus = 'wait' | 'doing' | 'done' | 'closed' | 'cancel';

/** 执行下的任务 */
export interface Task {
  id: number;
  project: number;
  parent: number;
  execution: number;
  module: number;
  design: number;
  story: number;
  storyVersion: number;
  designVersion: number;
  fromBug: number;
  name: string;
  type: TaskType;
  pri: number;
  estimate: number;
  consumed: number;
  left: number;
  deadline: string | null;
  status: TaskStatus;
  subStatus: string;
  color: string;
  mailto: number[];
  desc: string;
  version: number;
  openedBy: ZenTaoUser;
  openedDate: string;
  assignedTo: ZenTaoUser;
  assignedDate: string;
  estStarted: string;
  realStarted: string | null;
  finishedBy: ZenTaoUser | null;
  finishedDate: string | null;
  finishedList: string;
  canceledBy: ZenTaoUser | null;
  canceledDate: string | null;
  closedBy: ZenTaoUser | null;
  closedDate: string | null;
  planDuration: number;
  realDuration: number;
  closedReason: string;
  lastEditedBy: ZenTaoUser | null;
  lastEditedDate: string | null;
  activatedDate: string;
  deleted: boolean;
  storyID: number | null;
  storyTitle: string | null;
  product: number | null;
  branch: number | null;
  latestStoryVersion: number | null;
  storyStatus: string | null;
  assignedToRealName: string;
  needConfirm: boolean;
  progress: number;
}

/** 获取执行任务列表响应 */
export interface GetTasksResponse {
  page: number;
  total: number;
  limit: number;
  tasks: Task[];
}

/** 获取执行任务列表查询参数 */
export interface GetTasksParams {
  page?: number;
  limit?: number;
}

/** 任务团队成员 */
export interface TaskTeamMember {
  id: number;
  root: number;
  type: string;
  account: string;
  role: string;
  limited: string;
  join: string;
  days: number;
  hours: number;
  estimate: number;
  consumed: number;
  left: number;
  order: number;
  realname: string;
  avatar: string;
  progress: number;
}

/** 任务操作记录 */
export interface TaskAction {
  id: number;
  objectType: string;
  objectID: number;
  product: string;
  project: number;
  execution: number;
  actor: string;
  action: string;
  date: string;
  comment: string;
  extra: string;
  read: string;
  history: unknown[];
  desc: string;
}

/** 前后任务 */
export interface TaskPreAndNext {
  pre: string;
  next: string;
}

/** 任务详情（含团队、操作记录等完整信息） */
export interface TaskDetail extends Task {
  children: Task[];
  team: TaskTeamMember[];
  files: unknown[];
  storySpec: string;
  storyVerify: string;
  storyFiles: unknown[];
  executionName: string;
  moduleTitle: string;
  actions: TaskAction[];
  preAndNext: TaskPreAndNext;
}

/** 获取任务详情响应 */
export type GetTaskResponse = TaskDetail;

/** 创建任务请求体 */
export interface CreateTaskBody {
  /** 任务名称 */
  name: string;
  /** 任务类型 */
  type: TaskType;
  /** 指派人员账号数组 */
  assignedTo: string[];
  /** 预计开始日期 */
  estStarted: string;
  /** 预计结束日期 */
  deadline: string;
  /** 所属模块 ID */
  module?: number;
  /** 关联需求 ID */
  story?: number;
  /** 来源 Bug ID */
  fromBug?: number;
  /** 优先级 */
  pri?: number;
  /** 预计工时 */
  estimate?: number;
  /** 创建人信息（通常由服务端根据 Token 填充） */
  openedBy?: ZenTaoUser;
  /** 创建时间（通常由服务端填充） */
  openedDate?: string;
}

/** 创建任务响应 */
export interface CreateTaskResponse extends Task {
  children: Task[];
  team: TaskTeamMember[];
  files: unknown[];
}

/** 修改任务请求体 */
export interface UpdateTaskBody {
  /** 所属模块 ID */
  module?: number;
  /** 关联需求 ID */
  story?: number;
  /** 来源 Bug ID */
  fromBug?: number;
  /** 任务名称 */
  name?: string;
  /** 任务类型 */
  type?: TaskType;
  /** 指派人员账号数组 */
  assignedTo?: string[];
  /** 优先级 */
  pri?: number;
  /** 预计工时 */
  estimate?: number;
  /** 预计开始日期 */
  estStarted?: string;
  /** 预计结束日期 */
  deadline?: string;
}

/** 修改任务响应 */
export interface UpdateTaskResponse extends Task {
  children: Task[];
  team: TaskTeamMember[];
  files: unknown[];
  cases?: Record<string, string>;
}

/** 删除任务响应 */
export interface DeleteTaskResponse {
  message: string;
}

/** 预算币种 */
export type BudgetUnit = 'CNY' | 'USD';

/** 项目集状态 */
export type ProgramStatus = 'wait' | 'doing' | 'suspended' | 'closed';

/** 项目集访问控制 */
export type ProgramAcl = 'open' | 'private';

/** 项目集 */
export interface Program {
  id: number;
  project: number;
  model: string;
  type: string;
  lifetime: string;
  budget: string;
  budgetUnit: BudgetUnit;
  attribute: string;
  percent: number;
  milestone: string;
  output: string;
  auth: string;
  parent: number;
  path: string;
  grade: number;
  name: string;
  code: string;
  begin: string;
  end: string;
  realBegan: string | null;
  realEnd: string | null;
  days: number;
  status: ProgramStatus | string;
  subStatus: string;
  pri: string;
  desc: string;
  version: number;
  parentVersion: number;
  planDuration: number;
  realDuration: number;
  openedBy: ZenTaoUser;
  openedDate: string;
  openedVersion: string;
  lastEditedBy: ZenTaoUser | string;
  lastEditedDate: string | null;
  closedBy: ZenTaoUser | null;
  closedDate: string | null;
  canceledBy: ZenTaoUser | null;
  canceledDate: string | null;
  PO: ZenTaoUser | null;
  PM: ZenTaoUser | null;
  QD: ZenTaoUser | null;
  RD: ZenTaoUser | null;
  team: string;
  acl: ProgramAcl | string;
  whitelist: unknown[];
  order: number;
  deleted: boolean;
  progress?: number;
}

/** 获取项目集列表查询参数 */
export interface GetProgramsParams {
  /** 排序，默认 order_asc；格式为排序字段+下划线+asc/desc */
  order?: string;
}

/** 获取项目集列表响应 */
export interface GetProgramsResponse {
  programs: Program[];
}

/** 根据项目集 ID 获取项目集详情响应 */
export type GetProgramResponse = Program;

/** 创建项目集请求体 */
export interface CreateProgramBody {
  /** 项目集名称 */
  name?: string;
  /** 父项目集，0 表示没有父项目集 */
  parent?: number | string;
  /** 项目负责人（用户 ID 或账号） */
  PM?: number | string;
  /** 预算金额 */
  budget?: number;
  /** 预算币种 */
  budgetUnit?: BudgetUnit | string;
  /** 项目集描述 */
  desc?: string;
  /** 预计开始日期 */
  begin?: string;
  /** 预计结束日期 */
  end?: string;
  /** 访问控制 */
  acl?: ProgramAcl | string;
  /** 白名单（仅 acl = private 时生效） */
  whitelist?: unknown[];
}

/** 创建项目集响应 */
export type CreateProgramResponse = Program;

/** 修改项目集请求体 */
export interface UpdateProgramBody {
  /** 项目集名称 */
  name?: string;
  /** 父项目集，0 表示没有父项目集 */
  parent?: number | string;
  /** 项目负责人（用户 ID 或账号） */
  PM?: number | string;
  /** 预算金额 */
  budget?: number;
  /** 预算币种 */
  budgetUnit?: BudgetUnit | string;
  /** 项目集描述 */
  desc?: string;
  /** 预计开始日期 */
  begin?: string;
  /** 预计结束日期 */
  end?: string;
  /** 访问控制 */
  acl?: ProgramAcl | string;
  /** 白名单 */
  whitelist?: unknown[];
}

/** 修改项目集响应 */
export type UpdateProgramResponse = Program;

/** 删除项目集响应 */
export interface DeleteProgramResponse {
  message: string;
}

/** 项目模型 */
export type ProjectModel = 'scrum' | 'waterfall';

/** 项目状态 */
export type ProjectStatus = 'wait' | 'doing' | 'suspend' | 'suspended' | 'closed';

/** 项目访问控制 */
export type ProjectAcl = 'open' | 'private';

/** 项目权限控制 */
export type ProjectAuth = 'extend' | 'reset';

/** 项目 */
export interface Project {
  id: number;
  model: ProjectModel | string;
  type: string;
  lifetime: string;
  budget: string | number;
  budgetUnit: BudgetUnit | string;
  attribute: string;
  percent: number;
  milestone: string;
  output: string;
  auth: string;
  parent: number;
  path: string;
  grade: number;
  name: string;
  code: string;
  begin: string;
  end: string;
  realBegan: string | null;
  realEnd: string | null;
  days: number;
  status: ProjectStatus | string;
  subStatus: string;
  pri: string;
  desc: string;
  version: number;
  parentVersion: number;
  planDuration: number;
  realDuration: number;
  openedBy: ZenTaoUser | string;
  openedDate: string;
  openedVersion: string;
  lastEditedBy: ZenTaoUser | string;
  lastEditedDate: string | null;
  closedBy: ZenTaoUser | string | null;
  closedDate: string | null;
  canceledBy: ZenTaoUser | string | null;
  canceledDate: string | null;
  PO: ZenTaoUser | string | null;
  PM: ZenTaoUser | string | null;
  QD: ZenTaoUser | string | null;
  RD: ZenTaoUser | string | null;
  team: string;
  acl: ProjectAcl | string;
  whitelist: unknown;
  order: number;
  deleted: boolean | string;
  progress?: number;
}

/** 获取项目列表查询参数 */
export interface GetProjectsParams {
  /** 第几页，默认 1 */
  page?: number | string;
  /** 每页项目数量，默认 20 */
  limit?: number | string;
}

/** 获取项目列表响应 */
export interface GetProjectsResponse {
  page: number;
  total: number;
  limit: number;
  projects: Project[];
}

/** 根据项目 ID 获取项目详情响应 */
export type GetProjectResponse = Project;

/** 创建项目请求体 */
export interface CreateProjectBody {
  /** 项目名称 */
  name: string;
  /** 项目编号 */
  code: string;
  /** 计划开始日期 */
  begin: string;
  /** 计划结束日期 */
  end: string;
  /** 关联产品 ID 数组，不能为空 */
  products: number[];
  /** 项目模型，默认 scrum */
  model?: ProjectModel | string;
  /** 所属项目集，默认 0 */
  parent?: number;
}

/** 创建项目响应 */
export type CreateProjectResponse = Project;

/** 修改项目请求体 */
export interface UpdateProjectBody {
  /** 项目名称 */
  name?: string;
  /** 项目代号 */
  code?: string;
  /** 所属项目集 */
  parent?: number;
  /** 项目负责人（用户 ID 或账号） */
  PM?: number | string;
  /** 项目预算金额 */
  budget?: number;
  /** 预算币种 */
  budgetUnit?: BudgetUnit | string;
  /** 可用工作日 */
  days?: number;
  /** 项目描述 */
  desc?: string;
  /** 访问控制 */
  acl?: ProjectAcl | string;
  /** 白名单 */
  whitelist?: unknown[];
  /** 权限控制 */
  auth?: ProjectAuth | string;
}

/** 修改项目响应 */
export type UpdateProjectResponse = Project;

/** 删除项目响应 */
export interface DeleteProjectResponse {
  message: string;
}

/** 执行状态 */
export type ExecutionStatus = 'wait' | 'doing' | 'suspended' | 'closed' | 'done';

/** 执行类型 */
export type ExecutionLifetime = 'short' | 'long' | 'ops';

/** 执行访问控制 */
export type ExecutionAcl = 'private' | 'open';

/** 执行（迭代 / sprint） */
export interface Execution {
  id: number;
  project: number;
  model?: string;
  type: string;
  lifetime?: ExecutionLifetime | string;
  budget?: string | number;
  budgetUnit?: BudgetUnit | string;
  attribute?: string;
  percent?: number;
  milestone?: string;
  output?: string;
  auth?: string;
  parent: number;
  path?: string;
  grade?: number;
  name: string;
  code: string;
  begin: string;
  end: string;
  realBegan?: string | null;
  realEnd?: string | null;
  days?: number;
  status: ExecutionStatus | string;
  subStatus?: string;
  pri?: string;
  desc?: string;
  version?: number;
  parentVersion?: number;
  planDuration?: number;
  realDuration?: number;
  openedBy: ZenTaoUser | string;
  openedDate: string;
  openedVersion?: string;
  lastEditedBy?: ZenTaoUser | string;
  lastEditedDate?: string | null;
  closedBy?: ZenTaoUser | string | null;
  closedDate?: string | null;
  canceledBy?: ZenTaoUser | string | null;
  canceledDate?: string | null;
  PO?: ZenTaoUser | string | null;
  PM?: ZenTaoUser | string | null;
  QD?: ZenTaoUser | string | null;
  RD?: ZenTaoUser | string | null;
  team?: string;
  teamMembers?: string[];
  acl?: ExecutionAcl | string;
  whitelist?: unknown;
  order?: number;
  deleted?: boolean | string;
  totalHours?: number;
  totalEstimate?: number;
  totalConsumed?: number;
  totalLeft?: number;
  progress?: number;
}

/** 获取项目执行列表查询参数 */
export interface GetExecutionsParams {
  /** 第几页，默认 1 */
  page?: number | string;
  /** 每页执行数量，默认 20 */
  limit?: number | string;
}

/** 获取项目执行列表响应 */
export interface GetExecutionsResponse {
  page: number;
  total: number;
  limit: number;
  executions: Execution[];
}

/** 创建执行请求体 */
export interface CreateExecutionBody {
  /** 执行名称 */
  name: string;
  /** 执行代号 */
  code: string;
  /** 计划开始日期 */
  begin: string;
  /** 计划结束日期 */
  end: string;
  /** 所属项目（一般由路径参数提供，可选传） */
  project?: number;
  /** 可用工作日 */
  days?: number;
  /** 类型：short 短期 | long 长期 | ops 运维 */
  lifetime?: ExecutionLifetime | string;
  /** 产品负责人 */
  PO?: string;
  /** 迭代负责人 */
  PM?: string;
  /** 测试负责人 */
  QD?: string;
  /** 发布负责人 */
  RD?: string;
  /** 团队成员账号数组 */
  teamMembers?: string[];
  /** 迭代描述 */
  desc?: string;
  /** 访问控制：private 私有 | open 继承项目权限 */
  acl?: ExecutionAcl | string;
  /** 白名单 */
  whitelist?: unknown[];
}

/** 创建执行响应 */
export type CreateExecutionResponse = Execution;

/** 获取执行详情响应 */
export type GetExecutionResponse = Execution;

/** 修改执行请求体 */
export interface UpdateExecutionBody {
  /** 所属项目 */
  project: number;
  /** 执行名称 */
  name: string;
  /** 执行代号 */
  code: string;
  /** 计划开始日期 */
  begin: string;
  /** 计划结束日期 */
  end: string;
  /** 可用工作日 */
  days?: number;
  /** 类型：short 短期 | long 长期 | ops 运维 */
  lifetime?: ExecutionLifetime | string;
  /** 产品负责人 */
  PO?: string;
  /** 迭代负责人 */
  PM?: string;
  /** 测试负责人 */
  QD?: string;
  /** 发布负责人 */
  RD?: string;
  /** 团队成员账号数组 */
  teamMembers?: string[];
  /** 迭代描述 */
  desc?: string;
  /** 访问控制：private 私有 | open 继承项目权限 */
  acl?: ExecutionAcl | string;
  /** 白名单，acl = private 时生效 */
  whitelist?: unknown[];
}

/** 修改执行响应 */
export type UpdateExecutionResponse = Execution;

/** 删除执行响应 */
export interface DeleteExecutionResponse {
  message: string;
}

/** Bug 类型 */
export type BugType =
  | 'codeerror'
  | 'config'
  | 'install'
  | 'security'
  | 'performance'
  | 'standard'
  | 'automation'
  | 'designdefect'
  | 'others'
  | '';

/** Bug 状态 */
export interface BugStatus {
  code: string;
  name: string;
}

/** 产品下的 Bug */
export interface Bug {
  id: number;
  project: number;
  product: number;
  branch: number;
  module: number;
  execution: number;
  plan: number;
  story: number;
  storyVersion: number;
  task: number;
  toTask: number;
  toStory: number;
  title: string;
  keywords: string;
  severity: number;
  pri: number;
  type: BugType | string;
  os: string;
  browser: string;
  hardware: string;
  found: string;
  steps: string;
  status: BugStatus;
  subStatus: string;
  color: string;
  confirmed: number;
  activatedCount: number;
  activatedDate: string;
  feedbackBy: string;
  notifyEmail: string;
  mailto: unknown;
  openedBy: ZenTaoUser;
  openedDate: string;
  openedBuild: string;
  assignedTo: ZenTaoUser | null;
  assignedDate: string;
  deadline: string;
  resolvedBy: ZenTaoUser | null;
  resolution: string;
  resolvedBuild: string;
  resolvedDate: string;
  closedBy: ZenTaoUser | null;
  closedDate: string;
  duplicateBug: number;
  linkBug: string;
  case: number;
  caseVersion: number;
  result: number;
  repo: number;
  entry: string;
  lines: string;
  v1: string;
  v2: string;
  repoType: string;
  testtask: number;
  lastEditedBy: ZenTaoUser | null;
  lastEditedDate: string;
  deleted: boolean;
  needconfirm: boolean;
}

/** 获取产品 Bug 列表查询参数 */
export interface GetBugsParams {
  page?: number;
  limit?: number;
}

/** 获取产品 Bug 列表响应 */
export interface GetBugsResponse {
  page: number;
  total: number;
  limit: number;
  bugs: Bug[];
}

/** Bug 详情（含关联名称、附件等完整信息） */
export interface BugDetail
  extends Omit<Bug, 'status' | 'deadline' | 'resolvedDate' | 'closedDate'> {
  status: 'active' | 'resolved' | 'closed' | string;
  deadline: string | null;
  resolvedDate: string | null;
  closedDate: string | null;
  executionName: string;
  storyTitle: string | null;
  storyStatus: string | null;
  latestStoryVersion: number | null;
  taskName: string | null;
  planName: string | null;
  projectName: string | null;
  toCases: unknown[];
  files: unknown[];
}

/** 获取 Bug 详情响应 */
export type GetBugResponse = BugDetail;

/** 创建 Bug 请求体 */
export interface CreateBugBody {
  /** Bug 标题 */
  title: string;
  /** 严重程度 */
  severity: number;
  /** 优先级 */
  pri: number;
  /** Bug 类型 */
  type: Exclude<BugType, ''> | string;
  /** 所属分支 */
  branch?: number;
  /** 所属模块 */
  module?: number;
  /** 所属执行 */
  execution?: number;
  /** 关键词 */
  keywords?: string;
  /** 操作系统 */
  os?: string;
  /** 浏览器 */
  browser?: string;
  /** 重现步骤 */
  steps?: string;
  /** 相关任务 */
  task?: number;
  /** 相关需求 */
  story?: number;
  /** 截止日期 */
  deadline?: string;
  /** 影响版本 */
  openedBuild?: string[];
}

/** 创建 Bug 响应 */
export type CreateBugResponse = Bug;

/** 修改 Bug 请求体 */
export interface UpdateBugBody {
  /** Bug 标题 */
  title: string;
  /** 严重程度 */
  severity: number;
  /** 优先级 */
  pri: number;
  /** Bug 类型 */
  type: Exclude<BugType, ''> | string;
  /** 所属分支 */
  branch?: number;
  /** 所属模块 */
  module?: number;
  /** 所属执行 */
  execution?: number;
  /** 关键词 */
  keywords?: string;
  /** 操作系统 */
  os?: string;
  /** 浏览器 */
  browser?: string;
  /** 重现步骤 */
  steps?: string;
  /** 相关任务 */
  task?: number;
  /** 相关需求 */
  story?: number;
  /** 截止日期 */
  deadline?: string;
  /** 影响版本 */
  openedBuild?: string[];
}

/** 修改 Bug 响应 */
export type UpdateBugResponse = Bug;

/** 删除 Bug 响应 */
export interface DeleteBugResponse {
  message: string;
}

/** Bug 解决方案 */
export type BugResolution =
  | 'fixed' // 已解决
  | 'notrepro' // 无法重现
  | 'duplicate' // 重复 Bug
  | 'bydesign' // 设计如此
  | 'willnotfix' // 不予解决
  | 'tostory' // 转为需求
  | 'postponed' // 延期处理
  | 'external' // 外部原因
  | string;

/** 解决 Bug 请求体 */
export interface ResolveBugBody {
  /** 解决方案（必填） */
  resolution: Exclude<BugResolution, ''>;
  /** 解决版本，如 "trunk"（主干） */
  resolvedBuild?: string;
  /** 备注（问题原因等），会挂在 resolved 历史记录下 */
  comment?: string;
  /** 指派给（账号） */
  assignedTo?: string;
  /** 重复 Bug ID（resolution 为 duplicate 时使用） */
  duplicateBug?: number;
}

/** 解决 Bug 响应 */
export type ResolveBugResponse = Bug;

/** 激活 Bug 请求体（字段均为可选） */
export interface ActivateBugBody {
  /** 指派给（账号） */
  assignedTo?: string;
  /** 影响版本 */
  openedBuild?: string[];
  /** 备注，会挂在 activated 历史记录下 */
  comment?: string;
}

/** 激活 Bug 响应 */
export type ActivateBugResponse = Bug;

/** 关闭 Bug 请求体（字段均为可选） */
export interface CloseBugBody {
  /** 备注，会挂在 closed 历史记录下 */
  comment?: string;
}

/** 关闭 Bug 响应 */
export type CloseBugResponse = Bug;

/** 用例类型 */
export type TestCaseType =
  | 'feature'
  | 'performance'
  | 'config'
  | 'install'
  | 'security'
  | 'interface'
  | 'unit'
  | 'other';

/** 用例适用阶段 */
export type TestCaseStage =
  | 'unittest'
  | 'feature'
  | 'intergrate'
  | 'system'
  | 'smoke'
  | 'bvt'
  | '';

/** 用例状态 */
export type TestCaseStatus = 'wait' | 'normal' | 'blocked' | 'investigate';

/** 产品下的用例 */
export interface TestCase {
  id: number;
  project: number;
  product: number;
  execution: number;
  branch: number;
  lib: number;
  module: number;
  path: number;
  story: number;
  storyVersion: number;
  title: string;
  precondition: string;
  keywords: string;
  pri: number;
  type: TestCaseType | string;
  auto: string;
  frame: string;
  stage: TestCaseStage | string;
  howRun: string;
  scriptedBy: string;
  scriptedDate: string | null;
  scriptStatus: string;
  scriptLocation: string;
  status: TestCaseStatus | string;
  subStatus: string;
  color: string;
  frequency: string;
  order: number;
  openedBy: ZenTaoUser;
  openedDate: string;
  reviewedBy: ZenTaoUser | null;
  reviewedDate: string | null;
  lastEditedBy: ZenTaoUser | null;
  lastEditedDate: string | null;
  version: number;
  linkCase: string;
  fromBug: number;
  fromCaseID: number;
  fromCaseVersion: number;
  deleted: boolean;
  lastRunner: string;
  lastRunDate: string | null;
  lastRunResult: string;
  storyTitle: string | null;
  needconfirm: boolean;
  bugs: number;
  results: number;
  caseFails: number;
  stepNumber: number;
  statusName: string;
}

/** 获取产品用例列表查询参数 */
export interface GetTestcasesParams {
  page?: number | string;
  limit?: number | string;
}

/** 获取产品用例列表响应 */
export interface GetTestcasesResponse {
  page: number;
  total: number;
  limit: number;
  testcases: TestCase[];
}

/** 用例步骤（创建请求） */
export interface TestCaseStepInput {
  /** 步骤描述 */
  desc: string;
  /** 期望结果 */
  expect: string;
}

/** 用例步骤详情 */
export interface TestCaseStep {
  id: number;
  parent: number;
  case: number;
  version: number;
  type: string;
  desc: string;
  expect: string;
}

/** 创建用例请求体 */
export interface CreateTestcaseBody {
  /** 用例标题 */
  title: string;
  /** 用例类型 */
  type: TestCaseType | string;
  /** 用例步骤 */
  steps: TestCaseStepInput[];
  /** 所属分支 */
  branch?: number;
  /** 所属模块 */
  module?: number;
  /** 所属需求 */
  story?: number;
  /** 适用阶段 */
  stage?: Exclude<TestCaseStage, ''> | string;
  /** 前置条件 */
  precondition?: string;
  /** 优先级 */
  pri?: number;
  /** 关键词 */
  keywords?: string;
}

/** 用例详情（含步骤、附件等完整信息） */
export interface TestCaseDetail extends TestCase {
  steps: TestCaseStep[];
  files: unknown[];
  currentVersion: number;
  toBugs: unknown[];
}

/** 获取用例详情响应 */
export type GetTestcaseResponse = TestCaseDetail;

/** 创建用例响应 */
export type CreateTestcaseResponse = TestCaseDetail;

/** 修改用例请求体 */
export interface UpdateTestcaseBody {
  /** 所属分支 */
  branch?: number;
  /** 所属模块 */
  module?: number;
  /** 所属需求 */
  story?: number;
  /** 用例标题 */
  title?: string;
  /** 用例类型 */
  type?: TestCaseType | string;
  /** 适用阶段 */
  stage?: Exclude<TestCaseStage, ''> | string;
  /** 前置条件 */
  precondition?: string;
  /** 优先级 */
  pri?: number;
  /** 用例步骤 */
  steps?: Array<Partial<TestCaseStepInput>>;
  /** 关键词 */
  keywords?: string;
}

/** 修改用例响应 */
export type UpdateTestcaseResponse = TestCaseDetail;

/** 删除用例响应 */
export interface DeleteTestcaseResponse {
  message: string;
}

/** 测试单状态 */
export type TestTaskStatus = 'wait' | 'doing' | 'done' | 'blocked' | string;

/** 测试单类型 */
export type TestTaskType =
  | 'integrate'
  | 'system'
  | 'acceptance'
  | 'performance'
  | 'safety'
  | 'smoke'
  | string;

/** 测试单 */
export interface TestTask {
  id: number;
  /** 所属项目 */
  project: number;
  /** 所属产品 */
  product: number;
  /** 测试单名称 */
  name: string;
  /** 所属执行 */
  execution: number;
  /** 所属版本 */
  build: number | string;
  /** 类型 */
  type: TestTaskType;
  /** 负责人 */
  owner: ZenTaoUser | string | null;
  /** 优先级 */
  pri: number;
  /** 开始日期 */
  begin: string;
  /** 结束日期 */
  end: string;
  /** 实际完成日期 */
  realFinishedDate: string | null;
  /** 抄送给 */
  mailto: string | null;
  /** 描述 */
  desc: string;
  /** 测试报告 */
  report: string | null;
  /** 状态（wait 未开始 | doing 进行中 | done 已关闭 | blocked 被阻塞） */
  status: TestTaskStatus;
  /** 关联的测试报告 ID */
  testreport: number;
  auto: string;
  subStatus: string;
  /** 创建人 */
  createdBy?: string;
  /** 创建日期 */
  createdDate?: string;
  deleted: string | boolean;
  /** 是否为多人任务 */
  multiple?: string | boolean;
  /** 所属分支 */
  branch: number | string;
  /** 所属产品名称 */
  productName?: string;
  /** 所属项目名称 */
  projectName?: string;
  /** 所属执行名称 */
  executionName?: string;
  /** 所属版本名称 */
  buildName?: string;
}

/** 获取测试单列表查询参数 */
export interface GetTesttasksParams {
  page?: number | string;
  limit?: number | string;
  /** 排序，默认 id_desc */
  order?: string;
  /** 所属产品 */
  product?: number | string;
  /** 所属分支 */
  branch?: number | string;
}

/** 获取测试单列表响应 */
export interface GetTesttasksResponse {
  page: number;
  total: number;
  limit: number;
  testtasks: TestTask[];
}

/** 测试单详情（含附件与关联用例执行信息） */
export interface TestTaskDetail extends TestTask {
  /** 产品类型 */
  productType?: string;
  /** 附件 */
  files?: unknown[];
  /** 关联用例及执行情况 */
  testcases?: TestTaskCase[];
}

/** 测试单下的用例（含执行指派与结果） */
export interface TestTaskCase extends TestCase {
  /** 所属测试单 ID */
  task: number;
  /** 用例 ID */
  case: number;
  /** 执行指派人 */
  assignedTo: string;
  /** 用例版本 */
  caseVersion: number;
}

/** 获取测试单详情响应 */
export type GetTesttaskResponse = TestTaskDetail;

/** 需求来源 */
export type StorySource =
  | 'customer'
  | 'user'
  | 'po'
  | 'market'
  | string;

/** 需求类型 */
export type StoryCategory =
  | 'feature'
  | 'interface'
  | 'performance'
  | 'safe'
  | 'experience'
  | 'improve'
  | 'other'
  | string;

/** 需求阶段 */
export type StoryStage =
  | 'wait'
  | 'planned'
  | 'projected'
  | 'developing'
  | 'developed'
  | 'testing'
  | 'tested'
  | 'verified'
  | 'released'
  | 'closed'
  | string;

/** 需求状态 */
export type StoryStatus = 'draft' | 'active' | 'closed' | 'changed' | string;

/** 需求（产品/项目列表共用） */
export interface Story {
  id: number;
  parent: number;
  product: number;
  branch: number;
  module: number;
  plan: string;
  source: StorySource;
  sourceNote: string;
  fromBug: number;
  title: string;
  keywords: string;
  type: string;
  category: StoryCategory;
  pri: number;
  estimate: number;
  status: StoryStatus;
  subStatus: string;
  color: string;
  stage: StoryStage;
  stagedBy: string;
  mailto: string;
  openedBy: ZenTaoUser | string;
  openedDate: string;
  assignedTo: ZenTaoUser | string;
  assignedDate: string;
  lastEditedBy: ZenTaoUser | string;
  lastEditedDate: string | null;
  reviewedBy: ZenTaoUser | string;
  reviewedDate: string | null;
  closedBy: ZenTaoUser | string;
  closedDate: string | null;
  closedReason: string;
  toBug: number;
  childStories: string;
  linkStories: string;
  duplicateStory: number;
  version: number;
  URChanged: string;
  deleted: boolean;
  planTitle: string;
}

/** 获取需求列表查询参数（产品/项目/执行共用） */
export interface GetStoriesParams {
  /** 第几页，默认 1 */
  page?: number | string;
  /** 每页需求数量，默认 20 */
  limit?: number | string;
}

/** 获取需求列表响应（产品/项目/执行共用） */
export interface GetStoriesResponse {
  page: number;
  total: number;
  limit: number;
  stories: Story[];
}

/** 需求关联的执行摘要 */
export interface StoryExecutionSummary {
  project: number;
  name: string;
  status: string;
}

/** 需求关联的任务摘要 */
export interface StoryTaskSummary {
  id: number;
  name: string;
  assignedTo: string;
  execution: number;
  status: string;
  consumed: number;
  left: number;
  type: string;
}

/** 需求详情（变更等写接口返回） */
export interface StoryDetail
  extends Omit<Story, 'assignedDate' | 'planTitle' | 'deleted'> {
  assignedDate: string | null;
  deleted: string | boolean;
  /** 需求描述 */
  spec: string;
  /** 验收标准 */
  verify: string;
  executions: Record<string, StoryExecutionSummary>;
  tasks: Record<string, StoryTaskSummary[]>;
  stages: unknown[];
  planTitle: Record<string, string> | string;
  children: unknown[];
}

/** 创建需求请求体 */
export interface CreateStoryBody {
  /** 需求标题 */
  title: string;
  /** 所属产品 */
  product: number;
  /** 优先级 */
  pri: number;
  /** 需求类型 */
  category: StoryCategory;
  /** 需求描述 */
  spec?: string;
  /** 验收标准 */
  verify?: string;
  /** 需求来源 */
  source?: StorySource;
  /** 来源备注 */
  sourceNote?: string;
  /** 预计工时 */
  estimate?: number;
  /** 关键词 */
  keywords?: string;
}

/** 获取需求详情响应 */
export type GetStoryResponse = StoryDetail;

/** 创建需求响应 */
export type CreateStoryResponse = StoryDetail;

/** 变更需求请求体 */
export interface ChangeStoryBody {
  /** 需求标题 */
  title?: string;
  /** 需求描述 */
  spec?: string;
  /** 验收标准 */
  verify?: string;
}

/** 变更需求响应 */
export type ChangeStoryResponse = StoryDetail;

/** 修改需求其他字段请求体 */
export interface UpdateStoryBody {
  /** 所属模块 */
  module?: number;
  /** 需求来源 */
  source?: StorySource;
  /** 来源备注 */
  sourceNote?: string;
  /** 优先级 */
  pri?: number;
  /** 需求类型 */
  category?: StoryCategory;
  /** 预计工时 */
  estimate?: number;
  /** 关键词 */
  keywords?: string;
}

/** 修改需求其他字段响应 */
export type UpdateStoryResponse = StoryDetail;

/** 删除需求响应 */
export interface DeleteStoryResponse {
  message: string;
}

/** 产品类型 */
export type ProductType = 'normal' | 'branch' | 'platform';

/** 产品访问控制 */
export type ProductAcl = 'open' | 'private';

/** 产品下需求/用户需求各状态统计 */
export type ProductStoryStats = Record<string, string | number>;

/** 产品 */
export interface Product {
  id: number;
  program: number;
  name: string;
  code: string;
  bind: string;
  line: number;
  type: ProductType | string;
  status: string;
  subStatus: string;
  desc: string;
  PO: ZenTaoUser | null;
  QD: ZenTaoUser | null;
  RD: ZenTaoUser | null;
  acl: ProductAcl | string;
  whitelist: ZenTaoUser[];
  reviewer: string;
  createdBy: ZenTaoUser;
  createdDate: string;
  createdVersion: string;
  order: number;
  deleted: string;
  lineName: string;
  programName: string;
  stories: ProductStoryStats;
  requirements: ProductStoryStats;
  plans: number;
  releases: number;
  bugs: number;
  unResolved: number;
  closedBugs: number;
  fixedBugs: number;
  thisWeekBugs: number;
  assignToNull: number;
  progress: number;
}

/** 获取产品列表响应 */
export interface GetProductsResponse {
  total: number;
  products: Product[];
}
