---
title: 事件订阅
sidebar: 事件订阅
---

# 事件订阅

通过 `@bot.subscribe()` 装饰器，你可以订阅房间内的各种事件，实时响应变化。

## 基本用法

```typescript
new (class {
  @bot.subscribe('事件名称')
  async handler(data) {
    // 处理事件
  }
})()
```

## 事件类型

### 生命周期事件

| 事件名            | 触发时机   | 载荷类型   |
|----------------|--------|--------|
| `before-start` | 机器人启动前 | `void` |
| `after-start`  | 机器人启动后 | `void` |
| `before-stop`  | 机器人关闭前 | `void` |
| `after-stop`   | 机器人关闭后 | `void` |

### WebSocket 消息事件

| 事件名                 | 触发时机              | 载荷类型        |
|---------------------|-------------------|-------------|
| `websocket-message` | 收到任何 WebSocket 消息 | `WSMsgImpl` |

### 房间事件

| 事件名                               | 触发时机           | 载荷类型                             |
|-----------------------------------|----------------|----------------------------------|
| `command-message`                 | 收到指令消息         | `CommandWSMsg`                   |
| `user-join-or-leave-room`         | 用户加入或离开房间      | `UserJoinOrLeaveRoomWSMsg`       |
| `user-add-or-remove-emoji-to-msg` | 用户对消息发表/取消表情反应 | `UserAddOrRemoveEmojiToMsgWSMsg` |
| `card-message-btn-click`          | 用户点击卡片消息按钮     | `CardMessageBtnClickWSMsg`       |
| `user-im-message`                 | 收到用户私信         | `UserImMessageWSMsg`             |

## 使用示例

### 监听用户进出房间

```typescript
new (class {
  @bot.subscribe('user-join-or-leave-room')
  async onUserJoinOrLeave(data: UserJoinOrLeaveRoomWSMsg) {
    const name = data.userInfo.nickname
    if (data.isJoin) {
      this.sendMsg(`欢迎 ${name} 加入房间！`)
    } else {
      this.sendMsg(`${name} 离开了房间`)
    }
  }
})()
```

### 监听表情反应

```typescript
new (class {
  @bot.subscribe('user-add-or-remove-emoji-to-msg')
  async onEmojiReaction(data: UserAddOrRemoveEmojiToMsgWSMsg) {
    // data.addOrRemove: 'add' | 'remove'
    // data.emojiId: 表情 ID
    // data.msgId: 消息 ID
    // data.userInfo: 操作用户信息
  }
})()
```

### 监听卡片按钮点击

```typescript
new (class {
  @bot.subscribe('card-message-btn-click')
  async onCardBtnClick(data: CardMessageBtnClickWSMsg) {
    // data.buttonId: 按钮 ID
    // data.value: 按钮值
    // data.userInfo: 点击用户信息
    this.sendMsg(`${data.userInfo.nickname} 点击了按钮`)
  }
})()
```

### 监听原始 WebSocket 消息

```typescript
new (class {
  @bot.subscribe('websocket-message')
  async onRawMessage(data: WSMsgImpl) {
    console.log('收到消息:', data.type)
    // data.type: 消息类型码
    // 50 = 指令消息
    // 3001 = 用户进出房间
    // 5003 = 表情反应
    // card_message_btn_click = 卡片按钮点击
    // 5 = 用户私信
  }
})()
```

## 指令消息 vs 指令装饰器

注意：`command-message` 事件会在**任何**指令被触发时收到，而 `@bot.command()` 装饰器只会匹配你注册的具体指令。一般情况下，使用
`@bot.command()` 装饰器更简洁。
