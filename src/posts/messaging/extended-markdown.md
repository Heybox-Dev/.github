---
title: 扩展 Markdown
sidebar: 扩展 Markdown
---

# 扩展 Markdown 消息

扩展 Markdown 是黑盒语音的富文本消息格式，支持标题、链接、图片、@提及、列表等多种元素。

## 基本使用

```typescript
import { ExtendedMarkdownMessageImpl } from 'heybox-bot'

const msg = new ExtendedMarkdownMessageImpl()
```

## 文本

添加普通文本段落：

```typescript
msg.text('这是一段文本')
```

## 链接

添加带链接的文本：

```typescript
msg.text('访问 ')
msg.link('官网', 'https://example.com')
msg.text(' 了解更多')
```

## 图片

添加小尺寸图片：

```typescript
msg.image('https://example.com/image.png')
```

## @提及

### @用户

```typescript
// @指定用户（需要用户 ID）
msg.at('用户ID')
```

### @全体成员

```typescript
msg.atAll()
```

### @在线成员

```typescript
msg.atHear()
```

### @身份组

```typescript
// @指定身份组（需要身份组 ID）
msg.atRole('身份组名称', '身份组ID')
```

### 提及频道

```typescript
msg.mentionChannel('频道ID')
```

## 标题

```typescript
msg.header('这是一级标题')
```

## 有序列表

```typescript
msg.order(['第一项', '第二项', '第三项'])
```

## 无序列表

```typescript
msg.list(['项目 A', '项目 B', '项目 C'])
```

## 引用（缩进）

```typescript
msg.indent('这是引用的内容')
```

## 链式调用

支持链式调用，以下是一个完整示例：

```typescript
import { ExtendedMarkdownMessageImpl } from 'heybox-bot'

const msg = new ExtendedMarkdownMessageImpl()
  .header('📢 欢迎新成员')
  .text('欢迎 ')
  .at('user-id-123')
  .text(' 加入我们！')
  .header('📋 入群须知')
  .list([
    '请阅读群公告',
    '修改群名片',
    '友好交流'
  ])
  .header('🔗 相关链接')
  .text('官方网站：')
  .link('点击访问', 'https://example.com')

// 转换为可发送的消息
const message = msg.convert()
```

## 输出消息

构建完成后通过 `sendMsgBy` 发送：

```typescript
const extendedMsg = new ExtendedMarkdownMessageImpl()
  .header('标题')
  .text('内容')

// 方式一：直接发送
this.sendMsgBy(new MessageBuilder().markdown(extendedMsg))

// 方式二：先转换为 Message
const message = extendedMsg.convert()
// 然后通过 sendMsg 发送（需要进一步处理）
```

::: tip 提示
扩展 Markdown 最适合用于信息展示和格式化通知。如果需要更复杂的交互，建议使用 [卡片消息](./card-message)。
:::
