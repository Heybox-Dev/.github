---
title: 消息系统
sidebar: 消息系统
---

# 消息系统

HeyBoxBot 提供了丰富的消息类型，满足不同的使用场景。

## 消息类型概览

| 类型             | 说明         | 使用场景      |
|----------------|------------|-----------|
| 纯文本消息          | 简单的文本内容    | 快速回复      |
| 扩展 Markdown 消息 | 支持富文本格式    | 格式化内容、排版  |
| 卡片消息           | 结构化的交互式消息  | 复杂布局、按钮交互 |
| 用户消息（私信）       | 发送给指定用户的私信 | 私密通知      |

## 消息发送方式

所有消息发送方法都来自 `CommandSource`（在指令处理函数中通过 `this` 访问）：

```typescript
new (class {
  @bot.command('example')
  async example() {
    // 在房间发送文本消息
    this.sendMsg('Hello World!')

    // 在房间发送构建的消息
    this.sendMsgBy(messageBuilder)

    // 向指令发起者发送私信
    this.sendUserMsg('这是私信内容')

    // 向指令发起者发送构建的私信
    this.sendUserMsgBy(messageBuilder)
  }
})()
```
