---
title: 生命周期
sidebar: 生命周期
---

# 生命周期

HeyBoxBot 的生命周期分为四个阶段，每个阶段都有对应的事件钩子。

## 生命周期阶段

```
  new HeyBoxBot(config)
         │
         ▼
  ┌─────────────┐
  │ before-start │  ← 可在此阶段初始化外部资源
  ├─────────────┤
  │  after-start │  ← WebSocket 连接建立，开始接收消息
  ├─────────────┤
  │ before-stop  │  ← 可在此阶段清理资源
  ├─────────────┤
  │  after-stop  │  ← 连接已关闭
  └─────────────┘
```

## start() — 启动

```typescript
bot.start()
```

调用 `start()` 后：

1. 触发 `before-start` 事件
2. 建立 WebSocket 连接到黑盒语音服务器
3. 启动心跳检测（30 秒间隔）
4. 注册所有指令、定时任务和事件订阅
5. 触发 `after-start` 事件

## stop() — 停止

```typescript
bot.stop()
```

调用 `stop()` 后：

1. 触发 `before-stop` 事件
2. 关闭 WebSocket 连接
3. 触发 `after-stop` 事件

## 生命周期事件

通过 `@bot.subscribe()` 订阅生命周期事件：

```typescript
import { HeyBoxBot } from 'heybox-bot'

const bot = new HeyBoxBot({ token: '...' })

new (class {
  @bot.subscribe('before-start')
  async onBeforeStart() {
    console.log('机器人正在启动...')
    // 初始化数据库连接等
  }
})()

new (class {
  @bot.subscribe('after-start')
  async onAfterStart() {
    console.log('机器人已启动！')
    this.sendMsg('机器人已上线')
  }
})()

new (class {
  @bot.subscribe('before-stop')
  async onBeforeStop() {
    console.log('机器人正在关闭...')
    // 关闭数据库连接等
  }
})()

new (class {
  @bot.subscribe('after-stop')
  async onAfterStop() {
    console.log('机器人已关闭')
  }
})()

bot.start()
```

## 心跳机制

HeyBoxBot 内置了 WebSocket 心跳检测：

- 每 **30 秒** 发送一次 PING
- 每次收到 PONG 后重置计数器
- 连续 **5 次**（约 150 秒）未收到 PONG 则判定连接断开

你无需手动处理心跳，框架会自动维护连接状态。
