---
title: HTTP API 参考
sidebar: HTTP API 参考
---

# HTTP API 参考

HeyBoxBot 内部使用 Axios 封装了黑盒语音的 HTTP API。以下列出所有可用的底层 API 方法。

## 基础常量

所有 HTTP API 都基于以下常量：

```typescript
const BASE_URL = 'https://chat.xiaoheihe.cn/chatroom'
const WSS_URL = 'wss://chat.xiaoheihe.cn/chatroom/ws/connect'
```

## 消息相关 API

| 方法                  | 说明        |
|---------------------|-----------|
| `sendMessage()`     | 向房间发送消息   |
| `sendUserMessage()` | 向用户发送私信   |
| `uploadFile()`      | 上传文件到 CDN |
| `updateMessage()`   | 更新已发送的消息  |
| `deleteMessage()`   | 删除已发送的消息  |

## 邀请码 API

### createInviteCode — 创建邀请码

```typescript
await this.createInviteCode(roomId)
```

## 文件上传

HeyBoxBot 支持通过 CDN 上传文件（如图片），上传后获得 URL 用于消息发送。

```typescript
import { CommandImage } from 'heybox-bot'

new (class {
  @bot.command('upload', '上传并显示图片', ImageArgument)
  async uploadImage(img: CommandImage) {
    // img.url — 图片在 CDN 上的 URL
    // img.size — 图片大小（字节）
    this.sendMsg(`图片已上传\nURL: ${img.url}\n大小: ${img.size} 字节`)
  }
})()
```

::: tip 提示
文件上传通常由框架自动处理。当你使用 `ImageArgument` 或 `FileArgument` 参数时，用户发送的图片/文件会自动上传到 CDN。
:::
