---
title: 房间操作
sidebar: 房间操作
---

# 房间操作

## getRoomInfo — 获取房间信息

获取当前房间的详细信息。

```typescript
const roomInfo = await this.getRoomInfo()
// roomInfo.roomName — 房间名称
// roomInfo.roomId — 房间 ID
// roomInfo.memberCount — 成员数量
// roomInfo.onlineCount — 在线人数
```

## getJoinedRooms — 获取已加入的房间列表

获取 bot 加入的所有房间。

```typescript
const rooms = await this.getJoinedRooms()
// rooms: RoomBaseInfo[]
// 每个房间包含 roomId, roomName 等基本信息
```

## getRoomUsers — 获取房间用户列表

获取指定房间的用户列表。

```typescript
const users = await this.getRoomUsers(roomId)
// users: UserBaseInfo[]
```

## changeRoomNickname — 修改房间昵称

修改 bot 在房间中的昵称。

```typescript
await this.changeRoomNickname('我的新昵称')
```

## leaveRoom — 离开房间

让 bot 离开指定房间。

```typescript
await this.leaveRoom(roomId)
```

## kickOutUser — 踢出用户

将指定用户踢出房间。

```typescript
await this.kickOutUser(roomId, userId)
```

## banUser — 禁言用户

在房间中禁言指定用户。

```typescript
await this.banUser(roomId, userId)
```

## 使用示例

### 房间信息指令

```typescript
new (class {
  @bot.command('roominfo', '查看房间信息')
  async showRoomInfo() {
    const info = await this.getRoomInfo()
    this.sendMsg(
      `房间名称: ${info.roomName}
      房间 ID: ${info.roomId}
      成员数量: ${info.memberCount}
      在线人数: ${info.onlineCount}`
    )
  }
})()
```

### 用户列表指令

```typescript
new (class {
  @bot.command('users', '查看房间用户')
  async showRoomUsers() {
    const users = await this.getRoomUsers()
    const userList = users
      .slice(0, 20)
      .map((u, i) => `${i + 1}. ${u.nickname}`)
      .join('\n')
    this.sendMsg(`房间用户 (前20):\n${userList}`)
  }
})()
```

### 管理指令

```typescript
import { UserArgument } from 'heybox-bot'

new (class {
  @bot.command('kick', '踢出用户', UserArgument)
  async kickUser(user: CommandUserInfo) {
    const info = await this.getRoomInfo()
    await this.kickOutUser(info.roomId, user.userId)
    this.sendMsg(`${user.nickname} 已被移出房间`)
  }
})()

new (class {
  @bot.command('ban', '禁言用户', UserArgument, NumberArgument)
  async ban(user: CommandUserInfo, minutes: number) {
    const info = await this.getRoomInfo()
    await this.banUser(info.roomId, user.userId)
    this.sendMsg(`${user.nickname} 已被禁言 ${minutes} 分钟`)
  }
})()
```
