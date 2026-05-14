---
title: 身份组管理
sidebar: 身份组管理
---

# 身份组管理

身份组（角色）用于管理房间成员的权限级别。

## 身份组操作 API

### getRoomRoles — 获取房间身份组

获取房间中所有的身份组列表。

```typescript
const roles = await this.getRoomRoles(roomId)
```

### createRole — 创建身份组

```typescript
await this.createRole(roomId, {
  name: '新身份组',
  color: '#FF0000',
  permissions: ['send_message', 'manage_roles']
})
```

### updateRole — 修改身份组

```typescript
await this.updateRole(roomId, roleId, {
  name: '修改后的名称',
  color: '#00FF00'
})
```

### deleteRole — 删除身份组

```typescript
await this.deleteRole(roomId, roleId)
```

### grantRole — 授予身份组

将身份组授予指定用户。

```typescript
await this.grantRole(roomId, userId, roleId)
```

### revokeRole — 撤销身份组

撤销指定用户的身份组。

```typescript
await this.revokeRole(roomId, userId, roleId)
```

### updateRolePermissions — 修改身份组权限

```typescript
await this.updateRolePermissions(roomId, roleId, {
  permissions: ['send_message', 'kick_user', 'ban_user']
})
```

## 使用示例

### 获取所有身份组

```typescript
new (class {
  @bot.command('roles', '查看身份组')
  async showRoles() {
    const info = await this.getRoomInfo()
    const roles = await this.getRoomRoles(info.roomId)
    const roleList = roles
      .map(r => `${r.name} (ID: ${r.roleId})`)
      .join('\n')
    this.sendMsg(`身份组列表:\n${roleList}`)
  }
})()
```

### 授予管理权限

```typescript
new (class {
  @bot.command('promote', '提升用户权限', UserArgument, StringArgument)
  async promoteUser(user: CommandUserInfo, roleName: string) {
    const info = await this.getRoomInfo()
    const roles = await this.getRoomRoles(info.roomId)
    const role = roles.find(r => r.name === roleName)
    if (!role) {
      this.sendMsg(`未找到身份组: ${roleName}`)
      return
    }
    await this.grantRole(info.roomId, user.userId, role.roleId)
    this.sendMsg(`${user.nickname} 已被授予 ${roleName} 身份组`)
  }
})()
```

### 创建身份组

```typescript
new (class {
  @bot.command('createrole', '创建身份组', StringArgument)
  async createNewRole(name: string) {
    const info = await this.getRoomInfo()
    await this.createRole(info.roomId, {
      name,
      color: '#3498db',
      permissions: ['send_message']
    })
    this.sendMsg(`身份组 "${name}" 已创建`)
  }
})()
```
