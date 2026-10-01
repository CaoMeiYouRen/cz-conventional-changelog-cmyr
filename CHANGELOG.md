# cz-conventional-changelog-cmyr

## [2.0.1](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v2.0.0...v2.0.1) (2026-10-01)


### 🐛 Bug 修复

* **deps:** 修正 glob override 以修复 commitizen 配置加载 ([1a441a7](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1a441a7))
* **lint-md:** 适配 @lint-md/core 2.x 规则并锁定版本 ([1350b9b](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1350b9b))

# [2.0.0](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v1.1.1...v2.0.0) (2025-08-27)


### ✨ 新功能

* 优化 breaking change 处理逻辑 ([cfffc9d](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/cfffc9d))
* 优化提交信息构建逻辑，支持从多个字段合并主体内容，避免重复内容 ([5da1e9f](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/5da1e9f))
* 修改 commitlint 加载方式，确保兼容性；修复 commitlint 配置加载失败的问题 ([1c736ee](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1c736ee))
* 更新 commitlint 配置加载方式，支持从加载的配置中获取消息提示信息 ([d140f4d](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/d140f4d))
* 更新 Node.js 版本要求至 20.10 ([2b85de2](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/2b85de2))
* 添加深度合并配置对象的功能，优化配置加载逻辑 ([2a036a8](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/2a036a8))


### 🐛 Bug 修复

* 修复 breaking change 处理逻辑，优先使用 breakingBody 字段 ([02ff6a0](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/02ff6a0))
* 修复 commitizen 依赖的重复定义，调整为 peerDependencies ([7840285](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/7840285))
* 修复模块导出方式，改为使用 ES6 的 export 语法；增加 json 导入断言 ([efc94fe](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/efc94fe))
* 修改 commitizen 配置路径；调整 node 最低版本要求为 18 ([1ce054e](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/1ce054e))
* 修正导入语法以支持新的 JSON 类型声明 ([353ce4d](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/353ce4d))
* 更新配置路径为 ESM 格式，移除不必要的外部依赖排除 ([a1a5632](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/a1a5632))
* 添加 @commitlint/types 依赖并优化配置对象类型定义 ([34b226e](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/34b226e))
* 移除 lodash.map 依赖，改为使用 Object.entries 进行类型映射 ([68b6a39](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/68b6a39))
* 移除旧的 commitlint 配置，添加新的配置并更新相关依赖 ([84be301](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/84be301))


### 📦 代码重构

* 优化 commitizen 导入兼容性处理; 更新默认占位符值 ([5894cbc](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/5894cbc))
* 优化 issuesBody 处理逻辑; 改进 commitizen 导入处理 ([57d5e5f](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/57d5e5f))
* 优化配置对象接口，增强类型定义并改进深度合并逻辑 ([2fa38d1](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/2fa38d1))
* 移除不必要的深度合并逻辑，简化配置加载流程 ([bd099ba](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/bd099ba))


### 💥 BREAKING CHANGES

* 全面升级项目依赖，增加 esm 模块支持

# [2.0.0-beta.4](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2025-08-27)


### 🐛 Bug 修复

* 更新配置路径为 ESM 格式，移除不必要的外部依赖排除 ([a1a5632](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/a1a5632))
* 添加 @commitlint/types 依赖并优化配置对象类型定义 ([34b226e](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/34b226e))


### 📦 代码重构

* 优化配置对象接口，增强类型定义并改进深度合并逻辑 ([2fa38d1](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/2fa38d1))
* 移除不必要的深度合并逻辑，简化配置加载流程 ([bd099ba](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/bd099ba))

# [2.0.0-beta.3](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2025-08-26)


### ✨ 新功能

* 更新 Node.js 版本要求至 20.10 ([2b85de2](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/2b85de2))


### 🐛 Bug 修复

* 修正导入语法以支持新的 JSON 类型声明 ([353ce4d](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/353ce4d))

# [2.0.0-beta.2](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2025-08-26)


### ✨ 新功能

* 优化 breaking change 处理逻辑 ([cfffc9d](https://github.com/CaoMeiYouRen/cz-conventional-changelog-cmyr/commit/cfffc9d))

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
