---
title: 音频控制
sidebar: 音频控制
---

# 音频控制

HeyBoxBot 提供房间级别的音频控制功能。

## 音频控制 API

### muteRoomMicrophone — 房间麦克风静音

```typescript
await this.muteRoomMicrophone(roomId)
```

### muteRoomSpeaker — 房间扬声器静音

```typescript
await this.muteRoomSpeaker(roomId)
```

## 使用示例

```typescript
new (class {
  @bot.command('muteall', '全员静音')
  async muteAll() {
    const info = await this.getRoomInfo()
    await this.muteRoomMicrophone(info.roomId)
    this.sendMsg('已开启全员麦克风静音')
  }
})()

new (class {
  @bot.command('unmuteall', '取消全员静音')
  async unmuteAll() {
    // 注意：API 仅提供静音开关，取消静音可能需要额外的操作
    this.sendMsg('请手动取消静音')
  }
})()
```

## 注意事项

- 音频控制需要 bot 拥有相应的管理权限
- 静音是房间级别的操作，会影响房间内所有成员
- 通常用于语音频道管理的场景
