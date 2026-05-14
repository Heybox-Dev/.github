---
title: 直播推流
sidebar: 直播推流
---

# 直播推流

HeyBoxBot 支持在频道中推送直播流。

## 直播推流 API

### pushStreamToChannel — 推流到频道

向指定频道推送直播流。

```typescript
await this.pushStreamToChannel(roomId, channelId, streamUrl)
```

| 参数          | 类型       | 说明    |
|-------------|----------|-------|
| `roomId`    | `string` | 房间 ID |
| `channelId` | `string` | 频道 ID |
| `streamUrl` | `string` | 直播流地址 |

### stopStreamToChannel — 停止推流

停止向指定频道推送直播流。

```typescript
await this.stopStreamToChannel(roomId, channelId)
```

## 使用示例

```typescript
new (class {
  @bot.command('stream', '开始直播推流', StringArgument)
  async startStream(streamUrl: string) {
    const info = await this.getRoomInfo()
    // 获取当前用户所在的频道
    // 假设 bot 默认推送到语音频道
    await this.pushStreamToChannel(info.roomId, channelId, streamUrl)
    this.sendMsg('直播推流已启动')
  }
})()

new (class {
  @bot.command('stopstream', '停止直播推流')
  async stopStream() {
    const info = await this.getRoomInfo()
    await this.stopStreamToChannel(info.roomId, channelId)
    this.sendMsg('直播推流已停止')
  }
})()
```

::: warning 注意
直播推流功能可能需要相应的房间权限。请确保你的 bot 拥有推流权限。
:::
