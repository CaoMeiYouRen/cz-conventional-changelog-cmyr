import wrap from 'word-wrap'
import longest from 'longest'
import chalk from 'chalk'
import { lintMarkdown, LintMdRulesConfig } from '@lint-md/core'
import commitlintLoad from '@commitlint/load'
import defaultConfig, { Questions } from './config'

const fix = (markdown: string, rules?: LintMdRulesConfig) => lintMarkdown(markdown, rules, true)?.fixedResult?.result

function lintMd(markdown: string) {
    const rules = {
        'no-empty-code': 0,
        'no-trailing-punctuation': 0,
        'no-long-code': 0,
        'no-empty-code-lang': 0,
        'no-empty-inlinecode': 0,
    } as const
    const fixed = fix(markdown, rules)
    return fixed
}

const filter = function (array) {
    return array.filter((x) => x)
}

const headerLength = function (answers) {
    return (
        answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
    )
}

const maxSummaryLength = function (options, answers) {
    return options.maxHeaderWidth - headerLength(answers)
}

const filterSubject = function (subject, disableSubjectLowerCase) {
    subject = subject.trim()
    if (!disableSubjectLowerCase && subject.charAt(0).toLowerCase() !== subject.charAt(0)) {
        subject =
            subject.charAt(0).toLowerCase() + subject.slice(1, subject.length)
    }
    while (subject.endsWith('.')) {
        subject = subject.slice(0, subject.length - 1)
    }
    return lintMd(subject)
}

/**
 * 深度合并配置对象
 * @param target 目标配置对象
 * @param source 源配置对象
 * @returns 合并后的配置对象
 */
function deepMergeConfig(target: Questions, source: Questions): Questions {
    if (!source || typeof source !== 'object') {
        return target
    }

    const result = { ...target }

    for (const key in source) {
        const sourceValue = source[key]
        if (sourceValue !== null && sourceValue !== undefined) {
            const targetValue = target[key]
            if (typeof sourceValue === 'object' && !Array.isArray(sourceValue) && targetValue && typeof targetValue === 'object') {
                // 递归合并对象
                result[key] = deepMergeConfig(targetValue, sourceValue)
            } else {
                // 直接覆盖原始值、数组或 null/undefined
                result[key] = sourceValue
            }
        }
    }

    return result
}

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
export default function (options) {
    const types = options.types

    const length = longest(Object.keys(types)).length + 1
    const choices = Object.entries(types).map(([key, type]: [string, any]) => ({
        name: `${`${key}:`.padEnd(length)} ${type.description}`,
        value: key,
    }))

    return {
        // When a user runs `git cz`, prompter will
        // be executed. We pass you cz, which currently
        // is just an instance of inquirer.js. Using
        // this you can ask questions and get answers.
        //
        // The commit callback should be executed when
        // you're ready to send back a commit template
        // to git.
        //
        // By default, we'll de-indent your commit
        // template and will keep empty lines.
        async prompter(cz, commit) {
            let questions: Questions = defaultConfig
            try {
                const clConfig = await commitlintLoad()
                // 使用深度合并策略：defaultConfig 作为基础，clConfig.prompt.questions 作为覆盖
                if (clConfig?.prompt?.questions) {
                    questions = deepMergeConfig(defaultConfig, clConfig.prompt.questions)
                } else {
                    questions = defaultConfig
                }
                if (clConfig?.rules) {
                    const maxHeaderLengthRule = clConfig.rules['header-max-length']
                    if (
                        typeof maxHeaderLengthRule === 'object'
                        && maxHeaderLengthRule.length >= 3
                        && !process.env.CZ_MAX_HEADER_WIDTH
                    ) {
                        options.maxHeaderWidth = maxHeaderLengthRule[2]
                    }
                }
            } catch (error) {
                console.error('Error loading commitlint config:', error)
            }

            // Let's ask some questions of the user
            // so that we can populate our commit
            // template.
            //
            // See inquirer.js docs for specifics.
            // You can also opt to use another input
            // collection library if you prefer.
            cz.prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: questions.type.description,
                    choices,
                    default: options.defaultType,
                },
                {
                    type: 'input',
                    name: 'scope',
                    message: questions.scope.description,
                    default: options.defaultScope,
                    filter(value) {
                        return options.disableScopeLowerCase
                            ? value.trim()
                            : value.trim().toLowerCase()
                    },
                },
                {
                    type: 'input',
                    name: 'subject',
                    message(answers) {
                        return (
                            `${questions.subject.description} (最多 ${maxSummaryLength(options, answers)
                            } 个字符):\n`
                        )
                    },
                    default: options.defaultSubject,
                    validate(subject, answers) {
                        const filteredSubject = filterSubject(subject, options.disableSubjectLowerCase)
                        // eslint-disable-next-line no-nested-ternary
                        return filteredSubject.length === 0
                            ? 'subject 是必须的'
                            : filteredSubject.length <= maxSummaryLength(options, answers)
                                ? true
                                : `subject 长度必须小于或等于 ${maxSummaryLength(options, answers)
                                } 个字符. 当前长度为 ${filteredSubject.length
                                } 个字符.`
                    },
                    transformer(subject, answers) {
                        const filteredSubject = filterSubject(subject, options.disableSubjectLowerCase)
                        const color =
                            filteredSubject.length <= maxSummaryLength(options, answers)
                                ? chalk.green
                                : chalk.red
                        return color(`(${filteredSubject.length}) ${subject}`)
                    },
                    filter(subject) {
                        return filterSubject(subject, options.disableSubjectLowerCase)
                    },
                },
                {
                    type: 'input',
                    name: 'body',
                    message: questions.body.description,
                    default: options.defaultBody,
                    filter(text) {
                        return lintMd(text)
                    },
                },
                {
                    type: 'confirm',
                    name: 'isBreaking',
                    message: questions.isBreaking.description,
                    default: false,
                },
                {
                    type: 'input',
                    name: 'breakingBody',
                    default: '-',
                    message: questions.breakingBody.description,
                    when(answers) {
                        return answers.isBreaking && !answers.body
                    },
                    validate(breakingBody) {
                        return (
                            breakingBody.trim().length > 0
                            || 'BREAKING CHANGE 必须要填写 body!'
                        )
                    },
                    filter(text) {
                        return lintMd(text)
                    },
                },
                {
                    type: 'input',
                    name: 'breaking',
                    message: questions.breaking.description,
                    when(answers) {
                        return answers.isBreaking
                    },
                    filter(text) {
                        return lintMd(text)
                    },
                },

                {
                    type: 'confirm',
                    name: 'isIssueAffected',
                    message: questions.isIssueAffected.description,
                    default: !!options.defaultIssues,
                },
                {
                    type: 'input',
                    name: 'issuesBody',
                    default: '-',
                    message: questions.issuesBody.description,
                    when(answers) {
                        return (
                            answers.isIssueAffected && !answers.body && !answers.breakingBody
                        )
                    },
                    filter(text) {
                        return lintMd(text)
                    },
                },
                {
                    type: 'input',
                    name: 'issues',
                    message: questions.issues.description,
                    when(answers) {
                        return answers.isIssueAffected
                    },
                    default: options.defaultIssues ? options.defaultIssues : undefined,
                },
            ]).then((answers) => {
                const wrapOptions = {
                    trim: true,
                    cut: false,
                    newline: '\n',
                    indent: '',
                    width: options.maxLineWidth,
                }

                // parentheses are only needed when a scope is present
                const scope = answers.scope ? `(${answers.scope})` : ''

                // Hard limit this line in the validate
                const head = `${answers.type + scope}: ${answers.subject}`

                // Construct body from multiple sources, preserving all user inputs
                const bodyParts: string[] = []

                // Add main body if provided
                if (answers.body && answers.body.trim() && answers.body !== '-') {
                    bodyParts.push(answers.body.trim())
                }

                // Add issuesBody if provided and different from other bodies
                const trimmedIssuesBody = answers.issuesBody && answers.issuesBody.trim()
                if (trimmedIssuesBody && answers.issuesBody !== '-' && !bodyParts.includes(trimmedIssuesBody)) {
                    bodyParts.push(trimmedIssuesBody)
                }

                const body = bodyParts.length > 0 ? wrap(bodyParts.join('\n\n'), wrapOptions) : false

                // Apply breaking change prefix, removing it if already present
                // Use breaking field first, then breakingBody as fallback
                let breaking: string = ''

                // Check if this is a breaking change based on user input
                const hasBreakingChange = answers.isBreaking && (answers.breaking?.trim() || answers.breakingBody?.trim())

                if (hasBreakingChange) {
                    const breakingContent = answers.breaking?.trim() || answers.breakingBody?.trim() || ''
                    // Always add BREAKING CHANGE prefix when user confirms it's a breaking change
                    breaking = `BREAKING CHANGE: ${breakingContent.replace(/^BREAKING CHANGE: /i, '')}`
                    breaking = wrap(breaking, wrapOptions)
                }

                const issues = answers.issues ? wrap(answers.issues, wrapOptions) : false
                commit(filter([head, body, breaking, issues]).join('\n\n'))
            })
        },
    }
}
