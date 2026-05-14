---
title: CLI 工具
sidebar: CLI 工具
---

# CLI 工具

HeyBoxBot 提供了一个命令行工具 `heybox`，用于快速初始化和配置项目。

## 安装

安装 `heybox-bot` 后，CLI 工具即可使用：

```bash
npm install heybox-bot
```

## 命令

### heybox init

初始化一个新的 HeyBoxBot 项目。

```bash
npx heybox init
```

该命令会在当前目录创建完整的项目模板：

```
my-bot/
├── package.json          # 含 bot 启动脚本
├── tsconfig.json         # TypeScript 编译配置
├── .prettierrc.js        # 代码格式化配置
├── eslint.config.mjs     # ESLint 代码检查配置
├── nodemon.json          # 开发热重载配置
└── src/
    └── index.ts          # 机器人示例代码
```

### heybox --help

显示帮助信息。

```bash
npx heybox --help
```

### heybox --version

显示版本号。

```bash
npx heybox --version
```

## 初始化后的项目结构

初始化后的 `src/index.ts` 包含一个基础的 bot 模板：

```typescript
import { HeyBoxBot } from 'heybox-bot'

const bot = new HeyBoxBot({
  token: '你的机器人Token'
})

// 在此添加你的指令、定时任务和事件订阅
new (class {
  @bot.command('ping', '回复 pong')
  async ping() {
    this.sendMsg('pong!')
  }
})()

bot.start()
```

## 开发流程

1. 运行 `npx heybox init` 初始化项目
2. 安装依赖：`pnpm install`
3. 编辑 `src/index.ts`，填入你的 Token 并添加功能
4. 运行 `pnpm dev` 启动开发模式
5. 修改代码后自动重启，无需手动操作

## 启动脚本

初始化后 `package.json` 中包含以下脚本：

```json
{
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

- `pnpm dev` — 开发模式，代码变更时自动重启
- `pnpm build` — 编译 TypeScript 到 `dist/`
- `pnpm start` — 运行编译后的代码
