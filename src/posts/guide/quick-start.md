---
title: 快速开始
sidebar: 快速开始
---

# 快速开始

## 获取 Token

在使用 HeyBoxBot 之前，你需要获取黑盒语音的机器人 Token：

1. 打开黑盒语音 App
2. 进入你想要添加机器人的房间
3. 在房间设置中找到「机器人」选项
4. 创建机器人并复制 Token

## 编写第一个机器人

创建 `src/index.ts`:

```typescript
import { HeyBoxBot } from 'heybox-bot'

const bot = new HeyBoxBot({
  token: '你的机器人Token'
})

// 注册一个简单的指令
new (class {
  @bot.command('ping', '回复 pong')
  async ping() {
    this.sendMsg('pong!')
  }
})()

// 启动机器人
bot.start()
```

## 运行机器人

```bash
pnpm dev
```

机器人启动后会连接到黑盒语音的 WebSocket 服务器，你就可以在房间里使用 `/ping` 指令了。

## 带参数的指令

```typescript
import { HeyBoxBot, StringArgument, NumberArgument, BooleanArgument } from 'heybox-bot'

new (class {
  @bot.command('echo', '复读消息', StringArgument)
  async echo(message: string) {
    this.sendMsg(message)
  }
})()

new (class {
  @bot.command('calc', '简单计算', NumberArgument, StringArgument, NumberArgument)
  async calc(a: number, op: string, b: number) {
    let result: number
    switch (op) {
      case '+': result = a + b; break
      case '-': result = a - b; break
      case '*': result = a * b; break
      case '/': result = a / b; break
      default:
        this.sendMsg('不支持的运算符')
        return
    }
    this.sendMsg(`${a} ${op} ${b} = ${result}`)
  }
})()

new (class {
  @bot.command('repeat', '重复消息 N 次', StringArgument, NumberArgument)
  async repeat(msg: string, times: number) {
    for (let i = 0; i < times; i++) {
      this.sendMsg(msg)
    }
  }
})()
```

## 可用的参数类型

| 参数类型              | 说明        | 示例输入             |
|-------------------|-----------|------------------|
| `StringArgument`  | 字符串参数     | `hello world`    |
| `NumberArgument`  | 数字参数      | `42`             |
| `BooleanArgument` | 布尔参数      | `true` / `false` |
| `UserArgument`    | 用户参数（@用户） | `@用户名`           |
| `ImageArgument`   | 图片参数      | 上传的图片            |
| `FileArgument`    | 文件参数      | 上传的文件            |
| `OptionArgument`  | 选项参数      | 从指定选项中匹配         |
