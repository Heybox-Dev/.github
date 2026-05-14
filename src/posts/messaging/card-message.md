---
title: 卡片消息
sidebar: 卡片消息
---

# 卡片消息

卡片消息是黑盒语音中最强大的消息格式，支持丰富的布局和交互元素。

## 基本概念

卡片消息由以下组件构成：

- **CardOriginal** — 卡片数据构建器，定义卡片的内容和结构
- **MessageBuilder** — 消息构建器，将卡片封装为可发送的消息
- **CardMessageImpl** — 卡片消息实现

## 快速开始

```typescript
import { CardOriginal, MessageBuilder } from 'heybox-bot'

const card = new CardOriginal()
  .header('卡片标题')
  .section('这是卡片的内容')

const message = new MessageBuilder().card(card)
this.sendMsgBy(message)
```

## 卡片组件详解

### header — 标题

设置卡片顶部的标题。

```typescript
new CardOriginal()
  .header('📊 每日统计')
```

### section — 文本段落

添加普通文本段落。

```typescript
new CardOriginal()
  .header('通知')
  .section('这是一段正文内容')
  .section('这是另一段正文内容')
```

### text — 纯文本

添加纯文本（不带段落样式）。

```typescript
new CardOriginal()
  .text('简洁的文本行')
```

### markdown — Markdown 文本

添加 Markdown 格式文本。

```typescript
new CardOriginal()
  .markdown('**加粗文本** 和 *斜体文本*')
```

### textWithImage — 文本配图片

在文本旁添加图片。

```typescript
new CardOriginal()
  .textWithImage('描述文字', 'https://example.com/image.png')
```

### markdownWithImage — Markdown 文本配图片

```typescript
new CardOriginal()
  .markdownWithImage('**重点内容**', 'https://example.com/image.png')
```

### textWithButton — 文本配按钮

在文本后添加按钮。

```typescript
new CardOriginal()
  .textWithButton('点击下方按钮', {
    text: '确认',
    value: 'confirm',
    id: 'btn-1'
  })
```

### markdownWithButton — Markdown 文本配按钮

```typescript
new CardOriginal()
  .markdownWithButton('**重要通知**', {
    text: '查看详情',
    value: 'view-detail',
    id: 'btn-detail'
  })
```

### images — 图片组

添加一组图片。

```typescript
new CardOriginal()
  .images([
    'https://example.com/img1.png',
    'https://example.com/img2.png'
  ])
```

### buttons — 按钮组

添加一组按钮。

```typescript
new CardOriginal()
  .buttons([
    { text: '确认', value: 'yes', id: 'btn-yes' },
    { text: '取消', value: 'no', id: 'btn-no' }
  ])
```

### divider — 分割线

添加水平分割线。

```typescript
new CardOriginal()
  .section('上方内容')
  .divider()
  .section('下方内容')
```

### countdown — 倒计时

添加倒计时组件。

```typescript
const endTime = Date.now() + 3600000 // 1 小时后

new CardOriginal()
  .header('限时活动')
  .countdown(endTime)
```

## 完整示例

### 投票卡片

```typescript
new (class {
  @bot.command('vote', '创建投票', StringArgument)
  async createVote(title: string) {
    const card = new CardOriginal()
      .header(`📊 投票: ${title}`)
      .divider()
      .section('请选择你的答案：')
      .buttons([
        { text: '👍 赞成', value: 'agree', id: 'vote-agree' },
        { text: '👎 反对', value: 'disagree', id: 'vote-disagree' },
        { text: '🤔 弃权', value: 'abstain', id: 'vote-abstain' }
      ])

    this.sendMsgBy(new MessageBuilder().card(card))
  }
})()
```

### 信息展示卡片

```typescript
new (class {
  @bot.command('roominfo', '查看房间信息')
  async roomInfo() {
    const info = await this.getRoomInfo()

    const card = new CardOriginal()
      .header(`🏠 ${info.roomName}`)
      .divider()
      .textWithImage(`房间 ID: ${info.roomId}`, info.roomAvatar)
      .section(`成员数量: ${info.memberCount}`)
      .section(`在线人数: ${info.onlineCount}`)
      .divider()
      .textWithButton('需要管理权限', {
        text: '申请管理',
        value: 'apply-admin',
        id: 'btn-admin'
      })

    this.sendMsgBy(new MessageBuilder().card(card))
  }
})()
```

### 用户面板卡片

```typescript
new (class {
  @bot.command('profile', '查看用户信息', UserArgument)
  async profile(user: CommandUserInfo) {
    const card = new CardOriginal()
      .header(`👤 ${user.nickname}`)
      .divider()
      .images([user.avatar])
      .section(`用户 ID: ${user.userId}`)
      .divider()
      .buttons([
        { text: '📨 发送私信', value: 'dm', id: 'profile-dm' },
        { text: '📋 查看资料', value: 'info', id: 'profile-info' }
      ])

    this.sendMsgBy(new MessageBuilder().card(card))
  }
})()
```

## 监听按钮点击

使用 [事件订阅](../core/events) 监听 `card-message-btn-click` 事件：

```typescript
new (class {
  @bot.subscribe('card-message-btn-click')
  async onCardClick(data: CardMessageBtnClickWSMsg) {
    switch (data.buttonId) {
      case 'vote-agree':
        this.sendMsg(`${data.userInfo.nickname} 投了赞成票`)
        break
      case 'vote-disagree':
        this.sendMsg(`${data.userInfo.nickname} 投了反对票`)
        break
    }
  }
})()
```
