---
title: 频道管理
sidebar: 频道管理
---

# 频道管理

HeyBoxBot 提供了完整的频道（子频道/语音频道）管理 API。

## 频道操作 API

### createChannel — 创建频道

```typescript
await this.createChannel(roomId, {
  name: '新频道',
  // 其他配置...
})
```

### deleteChannel — 删除频道

```typescript
await this.deleteChannel(roomId, channelId)
```

### getUserChannel — 获取用户所在频道

获取指定用户当前所在的频道。

```typescript
const channel = await this.getUserChannel(roomId, userId)
// channel: 用户所在的频道信息
```

### getChannelOnlineUsers — 获取频道在线用户

```typescript
const users = await this.getChannelOnlineUsers(roomId, channelId)
```

### moveChannelMember — 移动频道成员

将用户移动到指定频道。

```typescript
await this.moveChannelMember(roomId, userId, channelId)
```

### kickChannelUser — 从频道踢出用户

```typescript
await this.kickChannelUser(roomId, userId)
```

### muteChannelUser — 频道静音用户

```typescript
await this.muteChannelUser(roomId, userId)
```

### editChannelSetting — 修改频道设置

```typescript
await this.editChannelSetting(roomId, channelId, {
  // 频道设置...
})
```

### editChannelName — 修改频道名称

```typescript
await this.editChannelName(roomId, channelId, '新频道名称')
```

### setChannelPassword — 设置频道密码

```typescript
await this.setChannelPassword(roomId, channelId, 'password123')
```

### getUserChannelPermissions — 获取用户频道权限

```typescript
const permissions = await this.getUserChannelPermissions(roomId, userId, channelId)
```

## 使用示例

### 创建临时频道

```typescript
new (class {
  @bot.command('createchannel', '创建临时频道', StringArgument)
  async createTempChannel(name: string) {
    const info = await this.getRoomInfo()
    await this.createChannel(info.roomId, { name })
    this.sendMsg(`频道 "${name}" 已创建`)
  }
})()
```

### 移动用户到频道

```typescript
new (class {
  @bot.command('move', '移动用户', UserArgument, StringArgument)
  async moveUser(user: CommandUserInfo, channelName: string) {
    const info = await this.getRoomInfo()
    // 查找目标频道
    // ...
    await this.moveChannelMember(info.roomId, user.userId, targetChannelId)
    this.sendMsg(`${user.nickname} 已移动到频道`)
  }
})()
```

### 频道信息指令

```typescript
new (class {
  @bot.command('channels', '查看频道列表')
  async showChannels() {
    const info = await this.getRoomInfo()
    // 遍历房间频道...
    this.sendMsg(`频道列表: ...`)
  }
})()
```
