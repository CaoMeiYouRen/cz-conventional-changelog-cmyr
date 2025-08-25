# cz-conventional-changelog-cmyr

# [2.0.0-beta.1](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v1.1.1...v2.0.0-beta.1) (2025-08-25)


### ✨ 新功能

* 优化提交信息构建逻辑，支持从多个字段合并主体内容，避免重复内容 ([5da1e9f](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/5da1e9f))
* 修改 commitlint 加载方式，确保兼容性；修复 commitlint 配置加载失败的问题 ([1c736ee](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1c736ee))
* 更新 commitlint 配置加载方式，支持从加载的配置中获取消息提示信息 ([d140f4d](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/d140f4d))
* 添加深度合并配置对象的功能，优化配置加载逻辑 ([2a036a8](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/2a036a8))


### 🐛 Bug 修复

* 修复 breaking change 处理逻辑，优先使用 breakingBody 字段 ([02ff6a0](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/02ff6a0))
* 修复 commitizen 依赖的重复定义，调整为 peerDependencies ([7840285](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/7840285))
* 修复模块导出方式，改为使用 ES6 的 export 语法；增加 json 导入断言 ([efc94fe](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/efc94fe))
* 修改 commitizen 配置路径；调整 node 最低版本要求为 18 ([1ce054e](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1ce054e))
* 移除 lodash.map 依赖，改为使用 Object.entries 进行类型映射 ([68b6a39](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/68b6a39))
* 移除旧的 commitlint 配置，添加新的配置并更新相关依赖 ([84be301](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/84be301))


### 💥 BREAKING CHANGES

* 全面升级项目依赖，增加 esm 模块支持

## [1.1.1](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v1.1.0...v1.1.1) (2024-06-11)


### 🐛 Bug 修复

* 更新 word-wrap 版本；迁移包管理器到 pnpm；升级 GitHub Action 版本 ([1588bb5](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1588bb5))

# [1.1.0](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v1.0.0...v1.1.0) (2024-01-06)


### ✨ 新功能

* 新增 对提交的内容进行 lint-md 功能 ([072989a](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/072989a))

# 1.0.0 (2021-12-18)


### ✨ 新功能

* 完成项目开发，实现 commitizen 中文配置 ([61c80df](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/61c80df))
