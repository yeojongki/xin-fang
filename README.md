## Installation

```bash
$ yarn global add lerna umi
$ yarn install # 等价于 lerna bootstrap --npm-client yarn --use-workspaces
```

## Running the app

```bash
# development mode
$ yarn server:dev          # server
$ yarn admin:dev           # admin

# production mode todo
```

## Add dependence

```bash
# lerna 方式
$ lerna add `moduleName`                    # 为 root package 添加 `moduleName` 模块
$ lerna add `moduleName` --scope @xf/admin  # 为 @xf/admin 添加 `moduleName` 模块
$ lerna add @xf/common --scope @xf/admin    # 为 @xf/admin 添加内部模块 @xf/common

# yarn workspace 方式
# 注意：对于安装 `local dependency` yarn的实现暂时有bug 第一次安装需要指明版本号
$ yarn add -W `moduleName`           # 为 root package 添加 `moduleName` 模块
$ yarn workspace @xf/admin add `moduleName` # 为  @xf/admin 添加 `moduleName` 模块
```

## Remove dependence

```bash
$ yarn remove -W `moduleName`                  # 为 root package 移除 `moduleName` 模块
$ yarn workspace @xf/admin remove `moduleName` # 为  @xf/admin 移除 `moduleName` 模块
```
