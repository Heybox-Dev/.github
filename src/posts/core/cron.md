---
title: 定时任务
sidebar: 定时任务
---

# 定时任务

通过 `@bot.cron()` 装饰器，你可以轻松注册基于 cron 表达式的定时任务。

## 基本用法

```typescript
new (class {
  @bot.cron('cron表达式')
  async taskHandler() {
    // 定时执行的代码
  }
})()
```

## Cron 表达式

HeyBoxBot 使用 `node-cron` 库，支持标准的 5 位或 6 位 cron 表达式：

```
 ┌────────────── 秒 (可选)
 │ ┌──────────── 分钟 (0 - 59)
 │ │ ┌────────── 小时 (0 - 23)
 │ │ │ ┌──────── 日期 (1 - 31)
 │ │ │ │ ┌────── 月份 (1 - 12)
 │ │ │ │ │ ┌──── 星期 (0 - 7, 0 和 7 都表示周日)
 │ │ │ │ │ │
 * * * * * *
```

### 常用表达式

| 表达式           | 说明             |
|---------------|----------------|
| `* * * * *`   | 每分钟执行          |
| `0 * * * *`   | 每小时整点执行        |
| `0 9 * * *`   | 每天 9:00 执行     |
| `0 9 * * 1-5` | 工作日 9:00 执行    |
| `*/5 * * * *` | 每 5 分钟执行       |
| `0 0 1 * *`   | 每月 1 号 0:00 执行 |

## 使用示例

### 每日早安

```typescript
new (class {
  @bot.cron('0 8 * * *')
  async goodMorning() {
    this.sendMsg('早上好！新的一天开始了~')
  }
})()
```

### 每日统计报告

```typescript
new (class {
  @bot.cron('0 9 * * *')
  async dailyReport() {
    const stats = await this.getRoomInfo()
    this.sendMsg(
      `📊 每日统计：
      房间人数：${stats.memberCount}
      在线人数：${stats.onlineCount}`
    )
  }
})()
```

### 定时提醒

```typescript
new (class {
  @bot.cron('0 12 * * 1-5')
  async lunchReminder() {
    this.sendMsg('午饭时间到，记得吃饭哦！')
  }
})()

new (class {
  @bot.cron('0 18 * * *')
  async eveningReminder() {
    this.sendMsg('下班啦，今天辛苦了！')
  }
})()
```

### 带秒的表达式

```typescript
// 每 30 秒执行一次
new (class {
  @bot.cron('*/30 * * * * *')
  async every30Seconds() {
    console.log('每 30 秒执行一次')
  }
})()
```

## 在定时任务中发送消息

定时任务中的 `this` 直接绑定到 `HeyBoxBot` 实例，所以你可以直接调用所有发送消息的方法：

```typescript
new (class {
  @bot.cron('0 10 * * *')
  async morningTask() {
    // 发送频道消息
    this.sendMsg('频道消息')

    // 发送私信
    this.sendUserMsg('用户私信')

    // 获取房间信息
    const info = await this.getRoomInfo()
  }
})()
```

::: warning 注意
定时任务中发送消息时，需要确保 bot 已经正常连接到房间。如果 bot 加入了多个房间，消息会发送到默认房间。
:::
