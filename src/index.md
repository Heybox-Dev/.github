---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  image:
    src: /icon.svg
    alt: Heybox-Bot
  name: "Heybox-Dev"
  text: "Heybox-Bot"
  tagline: "一个 TypeScript 黑盒语音机器人框架"
  actions:
    - theme: brand
      text: 快速开始
      link: /posts/guide/quick-start
    - theme: alt
      text: 查看示例
      link: /posts/examples/

features:
  - title: 装饰器驱动的指令系统
    details: 通过 @bot.command() 装饰器注册指令，支持字符串、数字、布尔、用户、图片、文件等多种参数类型，自动解析用户输入
  - title: 强大的消息构建
    details: 支持扩展 Markdown 富文本格式和交互式卡片消息，包含标题、段落、按钮、倒计时等丰富的组件
  - title: 完整的 API 覆盖
    details: 房间管理、频道管理、身份组管理、表情管理、定时任务、事件订阅、直播推流、音频控制等功能一应俱全
---

