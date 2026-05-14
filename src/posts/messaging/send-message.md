---
title: 发送消息
sidebar: 发送消息
---

# 发送消息

## 发送频道消息

### sendMsg — 发送文本

最基础的发送方式：

```typescript
this.sendMsg('Hello, World!')
```

### sendMsgBy — 使用消息构建器发送

使用 `MessageBuilder` 构建复杂消息后发送：

```typescript
import { CardOriginal, MessageBuilder } from 'heybox-bot'

const card = new CardOriginal()
  .header('标题')
  .section('这是内容')

const builder = new MessageBuilder()
  .card(card)

this.sendMsgBy(builder)
```

## 发送私信

### sendUserMsg — 发送文本私信

向指令发起者发送纯文本私信：

```typescript
this.sendUserMsg('这是一条私信消息')
```

### sendUserMsgBy — 使用构建器发送私信

```typescript
const card = new CardOriginal()
  .header('系统通知')
  .section('你的申请已通过')

const builder = new MessageBuilder().card(card)
this.sendUserMsgBy(builder)
```

## 直接通过 Bot 实例发送

在非指令上下文（如定时任务、事件处理）中，可以通过 `HeyBoxBot` 实例的方法发送：

```typescript
import { HeyBoxBot } from 'heybox-bot'

const bot = new HeyBoxBot({ token: '...' })
bot.start()

// 发送频道消息
bot.sendMsg('频道消息')

// 向指定用户发送私信
bot.sendUserMsg('用户ID', '私信内容')

// 使用构建器发送
bot.sendMsgBy(roomId, messageBuilder)
bot.sendUserMsgBy(userId, messageBuilder)
```

## 更新消息

更新已发送的消息：

```typescript
// msgId 为发送消息时返回的消息 ID
this.updateMessage(msgId, '更新后的内容')
```

## 删除消息

删除已发送的消息：

```typescript
this.deleteMessage(msgId)
```

## 表情反应

对消息发表表情：

```typescript
// msgId: 消息 ID
// emojiId: 表情 ID
this.emojiReply(msgId, emojiId)
```
