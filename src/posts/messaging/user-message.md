---
title: 用户消息（私信）
sidebar: 用户消息（私信）
---

# 用户消息（私信）

用户消息用于向指定用户发送私信（IM 消息），为机器人提供一对一的私密通信能力。

## 消息类型

私信支持两种格式：

| 类型                    | 说明               |
|-----------------------|------------------|
| `MarkdownUserMessage` | Markdown 格式的私信消息 |
| `ImageUserMessage`    | 图片私信消息           |

## 发送 Markdown 私信

### 在指令中发送

```typescript
import { MarkdownUserMessageImpl, UserMessageBuilder } from 'heybox-bot'

new (class {
  @bot.command('dm', '发送私信', StringArgument)
  async sendDM(content: string) {
    const msg = new MarkdownUserMessageImpl()
      .text(content)

    // 方式一：直接发送文本
    this.sendUserMsg(content)

    // 方式二：使用构建器发送
    const builder = new UserMessageBuilder().markdown(msg)
    this.sendUserMsgBy(builder)
  }
})()
```

### 在非指令上下文中发送

```typescript
import { HeyBoxBot } from 'heybox-bot'

const bot = new HeyBoxBot({ token: '...' })

// 向指定用户发送私信
bot.sendUserMsg('user-id-123', '你好，这是一条私信')

// 向指定用户发送构建的私信
const msg = new MarkdownUserMessageImpl().text('你好')
bot.sendUserMsgBy('user-id-123', new UserMessageBuilder().markdown(msg))
```

## 发送图片私信

```typescript
import { ImageUserMessageImpl, UserMessageBuilder } from 'heybox-bot'

new (class {
  @bot.command('sendpic', '发送图片私信', ImageArgument)
  async sendPic(img: CommandImage) {
    const msg = new ImageUserMessageImpl()
      // 设置图片 URL
      // ...

    const builder = new UserMessageBuilder().image(msg)
    this.sendUserMsgBy(builder)
  }
})()
```

## 监听私信

通过 [事件订阅](../core/events#user-im-message) 监听 `user-im-message` 事件来接收用户的私信：

```typescript
new (class {
  @bot.subscribe('user-im-message')
  async onPrivateMessage(data: UserImMessageWSMsg) {
    // data.content: 私信内容
    // data.fromUserId: 发送者用户 ID
    // data.fromUserInfo: 发送者用户信息

    this.sendUserMsg(data.fromUserId, `收到你的消息：${data.content}`)
  }
})()
```

## UserMessageBuilder

`UserMessageBuilder` 用于构建私信消息：

```typescript
import { UserMessageBuilder, MarkdownUserMessageImpl, ImageUserMessageImpl } from 'heybox-bot'

const builder = new UserMessageBuilder()

// 添加 Markdown 内容
builder.markdown(new MarkdownUserMessageImpl().text('hello'))

// 添加图片
builder.image(new ImageUserMessageImpl(/* ... */))

// 发送
this.sendUserMsgBy(builder)
```

::: warning 注意
发送私信需要确保目标用户和 bot 之间存在私信通道。如果用户从未向 bot 发送过私信，bot 可能无法主动发起私信会话。
:::
