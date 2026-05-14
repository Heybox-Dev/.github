---
title: 表情管理
sidebar: 表情管理
---

# 表情管理

HeyBoxBot 提供房间表情的管理功能。

## 表情操作 API

### getRoomEmojis — 获取房间表情

获取房间中所有的自定义表情。

```typescript
const emojis = await this.getRoomEmojis(roomId)
// 返回表情列表，每个表情包含 id、name、url 等信息
```

### deleteRoomEmoji — 删除房间表情

删除指定的自定义表情。

```typescript
await this.deleteRoomEmoji(roomId, emojiId)
```

### updateRoomEmojiName — 修改表情名称

修改指定表情的名称。

```typescript
await this.updateRoomEmojiName(roomId, emojiId, '新名称')
```

## 使用示例

### 列出所有表情

```typescript
new (class {
  @bot.command('emojis', '查看房间表情')
  async showEmojis() {
    const info = await this.getRoomInfo()
    const emojis = await this.getRoomEmojis(info.roomId)

    const emojiList = emojis
      .slice(0, 30)
      .map((e, i) => `${i + 1}. ${e.name}`)
      .join('\n')

    this.sendMsg(`房间表情 (前30):\n${emojiList}\n共 ${emojis.length} 个表情`)
  }
})()
```

### 删除表情

```typescript
new (class {
  @bot.command('delemoji', '删除表情', StringArgument)
  async deleteEmoji(emojiName: string) {
    const info = await this.getRoomInfo()
    const emojis = await this.getRoomEmojis(info.roomId)
    const emoji = emojis.find(e => e.name === emojiName)

    if (!emoji) {
      this.sendMsg(`未找到表情: ${emojiName}`)
      return
    }

    await this.deleteRoomEmoji(info.roomId, emoji.id)
    this.sendMsg(`表情 "${emojiName}" 已删除`)
  }
})()
```

### 重命名表情

```typescript
new (class {
  @bot.command('renameemoji', '重命名表情', StringArgument, StringArgument)
  async renameEmoji(oldName: string, newName: string) {
    const info = await this.getRoomInfo()
    const emojis = await this.getRoomEmojis(info.roomId)
    const emoji = emojis.find(e => e.name === oldName)

    if (!emoji) {
      this.sendMsg(`未找到表情: ${oldName}`)
      return
    }

    await this.updateRoomEmojiName(info.roomId, emoji.id, newName)
    this.sendMsg(`表情 "${oldName}" 已重命名为 "${newName}"`)
  }
})()
```

## 对消息添加表情反应

使用 [send-message](../messaging/send-message#表情反应) 中的 `emojiReply` 方法对消息发表表情反应。
