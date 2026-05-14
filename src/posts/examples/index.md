---
title: 示例
sidebar: 示例
---

# 完整示例

本章提供完整的 bot 示例代码，展示 HeyBoxBot 的常用功能组合。

## 基础 Bot

```typescript
import { HeyBoxBot, StringArgument, NumberArgument } from 'heybox-bot'

const bot = new HeyBoxBot({ token: 'your-token' })

// === 基础指令 ===

new (class {
  @bot.command('ping', '延迟测试')
  async ping() {
    this.sendMsg('pong!')
  }
})()

new (class {
  @bot.command('echo', '复读消息', StringArgument)
  async echo(msg: string) {
    this.sendMsg(msg)
  }
})()

new (class {
  @bot.command('add', '加法计算', NumberArgument, NumberArgument)
  async add(a: number, b: number) {
    this.sendMsg(`${a} + ${b} = ${a + b}`)
  }
})()

// === 随机功能 ===

new (class {
  @bot.command('roll', '掷骰子 [最小值] [最大值]', NumberArgument, NumberArgument)
  async roll(min: number, max: number) {
    const result = Math.floor(Math.random() * (max - min + 1)) + min
    this.sendMsg(`🎲 掷出了 ${result} (范围: ${min}-${max})`)
  }
})()

new (class {
  @bot.command('choose', '随机选择', StringArgument)
  async choose(options: string) {
    const items = options.split(/[,，]/)
    const pick = items[Math.floor(Math.random() * items.length)]
    this.sendMsg(`我选择: ${pick.trim()}`)
  }
})()

// === 启动 ===

bot.start()
```

## 功能丰富的 Bot

以下是一个包含指令、定时任务、事件订阅和卡片消息的完整示例：

```typescript
import {
  HeyBoxBot,
  StringArgument,
  NumberArgument,
  UserArgument,
  OptionArgument,
  CardOriginal,
  MessageBuilder,
  ExtendedMarkdownMessageImpl
} from 'heybox-bot'

const bot = new HeyBoxBot({ token: 'your-token' })

// =====================
// 指令
// =====================

new (class {
  @bot.command('ping', '延迟测试')
  async ping() {
    const start = Date.now()
    this.sendMsg('pong!')
  }
})()

new (class {
  @bot.command('calc', '四则运算计算器',
    NumberArgument,
    new OptionArgument(['+', '-', '*', '/', '^']),
    NumberArgument
  )
  async calc(a: number, op: string, b: number) {
    let result: number
    switch (op) {
      case '+': result = a + b; break
      case '-': result = a - b; break
      case '*': result = a * b; break
      case '/': result = a / b; break
      case '^': result = Math.pow(a, b); break
      default:
        this.sendMsg('未知运算符')
        return
    }
    this.sendMsg(`${a} ${op} ${b} = ${result}`)
  }
})()

// =====================
// 房间管理
// =====================

new (class {
  @bot.command('roominfo', '查看房间信息')
  async roomInfo() {
    const info = await this.getRoomInfo()
    const msg = new ExtendedMarkdownMessageImpl()
      .header(`🏠 ${info.roomName}`)
      .text(`房间 ID: ${info.roomId}`)
      .text(`成员数量: ${info.memberCount}`)
      .text(`在线人数: ${info.onlineCount}`)

    this.sendMsgBy(new MessageBuilder().markdown(msg))
  }
})()

new (class {
  @bot.command('setnick', '修改bot昵称', StringArgument)
  async setNick(nickname: string) {
    await this.changeRoomNickname(nickname)
    this.sendMsg(`昵称已修改为: ${nickname}`)
  }
})()

// =====================
// 卡片消息
// =====================

new (class {
  @bot.command('vote', '创建投票', StringArgument)
  async createVote(title: string) {
    const card = new CardOriginal()
      .header(`📊 投票: ${title}`)
      .divider()
      .section('请选择你的答案：')
      .buttons([
        { text: '👍 赞成', value: 'agree', id: 'vote-agree' },
        { text: '👎 反对', value: 'disagree', id: 'vote-disagree' }
      ])

    this.sendMsgBy(new MessageBuilder().card(card))
  }
})()

// =====================
// 定时任务
// =====================

new (class {
  @bot.cron('0 9 * * *')
  async dailyReport() {
    const info = await this.getRoomInfo()
    const card = new CardOriginal()
      .header('📊 每日统计')
      .section(`当前在线: ${info.onlineCount} 人`)
      .section(`总成员数: ${info.memberCount} 人`)

    this.sendMsgBy(new MessageBuilder().card(card))
  }
})()

// =====================
// 事件订阅
// =====================

new (class {
  @bot.subscribe('after-start')
  async onReady() {
    console.log('Bot 已启动')
    this.sendMsg('🤖 机器人已上线！')
  }
})()

new (class {
  @bot.subscribe('user-join-or-leave-room')
  async onUserJoinOrLeave(data: any) {
    if (data.isJoin) {
      this.sendMsg(`👋 欢迎 ${data.userInfo.nickname} 加入房间！`)
    }
  }
})()

new (class {
  @bot.subscribe('card-message-btn-click')
  async onCardClick(data: any) {
    if (data.buttonId === 'vote-agree') {
      this.sendMsg(`${data.userInfo.nickname} 投了赞成票`)
    } else if (data.buttonId === 'vote-disagree') {
      this.sendMsg(`${data.userInfo.nickname} 投了反对票`)
    }
  }
})()

// =====================
// 启动
// =====================

bot.start()
```

## 模块化组织

当 bot 功能较多时，建议将指令拆分到独立文件中：

```
src/
├── index.ts           # 入口
├── commands/
│   ├── ping.ts
│   ├── fun.ts
│   └── admin.ts
├── tasks/
│   └── daily.ts
└── events/
    └── welcome.ts
```

**src/commands/ping.ts:**

```typescript
import { bot } from '../index'
import { HeyBoxBot } from 'heybox-bot'

export function registerPingCommands(bot: HeyBoxBot) {
  new (class {
    @bot.command('ping', '延迟测试')
    async ping() {
      this.sendMsg('pong!')
    }
  })()
}
```

**src/index.ts:**

```typescript
import { HeyBoxBot } from 'heybox-bot'
import { registerPingCommands } from './commands/ping'

export const bot = new HeyBoxBot({ token: 'your-token' })

registerPingCommands(bot)

bot.start()
```

::: warning 注意
使用模块化方式时，需要确保所有模块在 `bot.start()` 之前完成注册。装饰器必须在类实例上执行，所以需要通过函数调用的方式传递
bot 实例。
:::
