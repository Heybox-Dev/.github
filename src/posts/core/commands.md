---
title: 指令系统
sidebar: 指令系统
---

# 指令系统

指令系统是 HeyBoxBot 的核心功能之一。通过 `@bot.command()` 装饰器，你可以轻松注册斜杠指令。

## 基本用法

```typescript
new (class {
  @bot.command('指令名', '指令描述', ...参数类型)
  async handler(...args) {
    // this.sendMsg() 发送消息
  }
})()
```

## 无参数指令

```typescript
new (class {
  @bot.command('ping', '回复 pong')
  async ping() {
    this.sendMsg('pong!')
  }
})()
```

使用：在房间内发送 `/ping` 即可触发。

## 带参数指令

参数通过位置顺序定义，框架会自动解析用户输入：

```typescript
import { StringArgument, NumberArgument, BooleanArgument } from 'heybox-bot'

// /add 1 2 → 回复 "1 + 2 = 3"
new (class {
  @bot.command('add', '两数相加', NumberArgument, NumberArgument)
  async add(a: number, b: number) {
    this.sendMsg(`${a} + ${b} = ${a + b}`)
  }
})()

// /say hello → 回复 "hello"
new (class {
  @bot.command('say', '复读', StringArgument)
  async say(msg: string) {
    this.sendMsg(msg)
  }
})()
```

## 参数类型

### StringArgument — 字符串

匹配任意字符串参数。

```typescript
new (class {
  @bot.command('echo', '复读', StringArgument)
  async echo(text: string) {
    this.sendMsg(text)
  }
})()
```

### NumberArgument — 数字

匹配数字参数，自动转换为 `number` 类型。

```typescript
new (class {
  @bot.command('roll', '掷骰子', NumberArgument, NumberArgument)
  async roll(min: number, max: number) {
    const result = Math.floor(Math.random() * (max - min + 1)) + min
    this.sendMsg(`掷出了 ${result}`)
  }
})()
```

### BooleanArgument — 布尔值

匹配 `true` 或 `false`。

```typescript
new (class {
  @bot.command('toggle', '开关', BooleanArgument)
  async toggle(state: boolean) {
    this.sendMsg(`当前状态: ${state ? '开' : '关'}`)
  }
})()
```

### UserArgument — 用户

匹配 @用户 参数，返回用户信息对象。

```typescript
import { UserArgument, CommandUserInfo } from 'heybox-bot'

new (class {
  @bot.command('greet', '向用户打招呼', UserArgument)
  async greet(user: CommandUserInfo) {
    this.sendMsg(`你好，${user.nickname}！`)
  }
})()
```

### ImageArgument — 图片

匹配用户上传的图片。

```typescript
import { ImageArgument, CommandImage } from 'heybox-bot'

new (class {
  @bot.command('showimg', '显示图片信息', ImageArgument)
  async showImage(img: CommandImage) {
    this.sendMsg(`图片 URL: ${img.url}\n大小: ${img.size} 字节`)
  }
})()
```

### FileArgument — 文件

匹配用户上传的文件。

```typescript
import { FileArgument, CommandFile } from 'heybox-bot'

new (class {
  @bot.command('showfile', '显示文件信息', FileArgument)
  async showFile(file: CommandFile) {
    this.sendMsg(`文件名: ${file.name}\n大小: ${file.size} 字节`)
  }
})()
```

### OptionArgument — 选项

限制参数只能从指定的选项中选取。

```typescript
import { OptionArgument } from 'heybox-bot'

// /calc 1 + 2   运算符只能是 + - * / ^
new (class {
  @bot.command('calc', '计算器', NumberArgument, new OptionArgument(['+', '-', '*', '/', '^']), NumberArgument)
  async calc(a: number, op: string, b: number) {
    let result: number
    switch (op) {
      case '+': result = a + b; break
      case '-': result = a - b; break
      case '*': result = a * b; break
      case '/': result = a / b; break
      case '^': result = Math.pow(a, b); break
      default: return
    }
    this.sendMsg(`${a} ${op} ${b} = ${result}`)
  }
})()
```

## 在指令中发送消息

指令处理函数中的 `this` 绑定到 `CommandSource`，提供以下方法：

| 方法                            | 说明                           |
|-------------------------------|------------------------------|
| `this.sendMsg(text)`          | 在房间内发送文本消息                   |
| `this.sendMsgBy(builder)`     | 使用 `MessageBuilder` 发送消息     |
| `this.sendUserMsg(text)`      | 向指令发起者发送私信                   |
| `this.sendUserMsgBy(builder)` | 使用 `MessageBuilder` 向发起者发送私信 |

## 自定义 CommandSource

在指令处理函数中，`this` 即是 `CommandSource` 对象，你可以访问其属性和方法：

```typescript
new (class {
  @bot.command('whoami', '查看自己的信息')
  async whoami() {
    // this 是 CommandSource，包含当前消息的上下文信息
    console.log(this.getName())    // 发送者名称
    console.log(this.hasPermission()) // 是否有权限
  }
})()
```
