---
title: 配置
sidebar: 配置
---

# 配置

## BotConfig

创建 `HeyBoxBot` 实例时，需要传入一个配置对象：

```typescript
import { HeyBoxBot } from 'heybox-bot'

const bot = new HeyBoxBot({
  token: 'your-bot-token',
  logLevel: 'info',
  proxy: {
    host: '127.0.0.1',
    port: 7890,
    protocol: 'http'
  }
})
```

## 配置项详解

| 字段         | 类型                                       | 必填 | 默认值      | 说明                |
|------------|------------------------------------------|----|----------|-------------------|
| `token`    | `string`                                 | ✅  | -        | 机器人 Token，从黑盒语音获取 |
| `logLevel` | `'debug' \| 'info' \| 'warn' \| 'error'` | ❌  | `'info'` | 日志输出级别            |
| `proxy`    | `object`                                 | ❌  | -        | HTTP 代理配置         |

### 日志级别

```typescript
// 开发阶段使用 debug 级别查看更多日志
const bot = new HeyBoxBot({ token: '...', logLevel: 'debug' })

// 生产环境使用 warn 级别减少日志输出
const bot = new HeyBoxBot({ token: '...', logLevel: 'warn' })
```

日志文件存储在运行目录下，格式为 `latest.log`。当有新日志写入时，旧的 `latest.log` 会被重命名为带时间戳的归档文件。

### 代理配置

```typescript
const bot = new HeyBoxBot({
  token: '...',
  proxy: {
    host: '127.0.0.1',   // 代理主机地址
    port: 7890,            // 代理端口
    protocol: 'http'       // 代理协议: 'http' 或 'https'
  }
})
```

### 环境变量

推荐将 Token 等敏感信息放在环境变量中：

```bash
# .env
BOT_TOKEN=your-bot-token
```

```typescript
const bot = new HeyBoxBot({
  token: process.env.BOT_TOKEN!,
  logLevel: (process.env.LOG_LEVEL as any) || 'info'
})
```

## 项目结构建议

```
my-bot/
├── src/
│   ├── index.ts          # 入口文件，创建 bot 实例
│   ├── commands/         # 指令模块
│   │   ├── ping.ts
│   │   └── fun.ts
│   ├── tasks/            # 定时任务模块
│   │   └── daily-report.ts
│   └── events/           # 事件订阅模块
│       └── welcome.ts
├── package.json
├── tsconfig.json
└── nodemon.json
```
