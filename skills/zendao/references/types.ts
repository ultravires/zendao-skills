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
