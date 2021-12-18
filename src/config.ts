const config = {
    type: {
        description: '请选择您要提交的更改类型',
        enum: {
            feat: {
                description: '一个新功能(feature)',
                title: 'Features',
                emoji: '✨',
            },
            fix: {
                description: '一个错误修复(bug fix)',
                title: 'Bug Fixes',
                emoji: '🐛',
            },
            docs: {
                description: '仅文档更改',
                title: 'Documentation',
                emoji: '📚',
            },
            style: {
                description:
                    '不影响代码含义的代码样式更改(空格、格式、缺少分号等)',
                title: 'Styles',
                emoji: '💎',
            },
            refactor: {
                description:
                    '既不修复错误也不添加功能的代码更改(代码重构)',
                title: 'Code Refactoring',
                emoji: '📦',
            },
            perf: {
                description: '提高性能的代码更改',
                title: 'Performance Improvements',
                emoji: '🚀',
            },
            test: {
                description: '添加缺失的测试或纠正现有的测试',
                title: 'Tests',
                emoji: '🚨',
            },
            build: {
                description:
                    '影响构建系统或外部依赖项的更改 (示例范围: gulp, broccoli, npm)',
                title: 'Builds',
                emoji: '🛠',
            },
            ci: {
                description:
                    '对我们的 CI 配置文件和脚本的更改 (示例范围: Travis, Circle, BrowserStack, SauceLabs)',
                title: 'Continuous Integrations',
                emoji: '⚙️',
            },
            chore: {
                description: '不修改 src 或测试文件的其他更改',
                title: 'Chores',
                emoji: '♻️',
            },
            revert: {
                description: '回退之前的提交',
                title: 'Reverts',
                emoji: '🗑',
            },
        },
    },
    scope: {
        description:
            '此更改的范围是什么(例如组件或文件名): (按 Enter 键跳过)',
    },
    subject: {
        description:
            '对变化写一个简短的、命令式的描述:\n',
    },
    body: {
        description: '提供更详细的更改描述: (按 Enter 键跳过)\n',
    },
    isBreaking: {
        description: '是否有任何破坏性变化(BREAKING CHANGE)?',
    },
    breakingBody: {
        description:
            '一个 BREAKING CHANGE 提交需要一个 body。请输入对提交本身的更长描述:\n',
    },
    breaking: {
        description: '描述破坏性变化:\n',
    },
    isIssueAffected: {
        description: '此更改会影响任何未解决的 issues 吗?',
    },
    issuesBody: {
        description:
            '如果 issues 已关闭，则提交需要一个主体。请输入对提交本身的更长描述:\n',
    },
    issues: {
        description: '添加问题参考 (例如 "fix #123", "re #123".):\n',
    },
}

export default config
