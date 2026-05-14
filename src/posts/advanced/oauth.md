---
title: OAuth 与账户
sidebar: OAuth 与账户
---

# OAuth 与账户

HeyBoxBot 提供 OAuth 相关的 API，用于获取和管理账户授权信息。

## OAuth API

### getOAuthCode — 获取授权码

获取 OAuth 授权码。

```typescript
const authCode = await this.getOAuthCode()
```

### refreshToken — 刷新 Token

刷新 OAuth Token。

```typescript
const newToken = await this.refreshToken()
```

### getAccountInfo — 获取账户信息

获取 bot 关联的账户信息。

```typescript
const account = await this.getAccountInfo()
// account 包含账户相关的用户数据
```

### getChatDuration — 获取聊天时长

获取 bot 账户的聊天时长统计数据。

```typescript
const duration = await this.getChatDuration()
```

## 使用示例

### 查看账户信息

```typescript
new (class {
  @bot.command('account', '查看账户信息')
  async showAccount() {
    const info = await this.getAccountInfo()
    this.sendMsg(
      `账户信息：
      ...`
    )
  }
})()
```

### 获取聊天时长

```typescript
new (class {
  @bot.command('duration', '查看聊天时长')
  async showDuration() {
    const duration = await this.getChatDuration()
    this.sendMsg(`聊天时长: ${duration} 分钟`)
  }
})()
```
