---
title: 安装
sidebar: 安装
---

# 安装

## 环境要求

- **Node.js** >= 18
- **pnpm**（推荐）或 npm

## 通过 npm 安装

```bash
npm install heybox-bot
```

或使用 pnpm:

```bash
pnpm add heybox-bot
```

## 初始化项目

安装完成后，使用 CLI 工具快速搭建项目模板：

```bash
npx heybox init
```

该命令会在当前目录创建以下文件：

```
.
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── .prettierrc.js        # Prettier 配置
├── eslint.config.mjs     # ESLint 配置
├── nodemon.json          # Nodemon 配置
└── src/
    └── index.ts          # 机器人入口文件
```

## 手动配置

如果你希望手动设置，至少需要安装以下依赖：

```bash
pnpm add heybox-bot
pnpm add -D typescript tsx nodemon
```

创建 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "sourceMap": true,
    "declaration": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

创建 `nodemon.json`:

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "tsx src/index.ts"
}
```

然后在 `package.json` 中添加启动脚本：

```json
{
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```
