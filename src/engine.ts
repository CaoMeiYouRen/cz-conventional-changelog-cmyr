import wrap from 'word-wrap'
import map from 'lodash.map'
import longest from 'longest'
import chalk from 'chalk'
import defaultConfig from './config'

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
    return subject
}

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
export default function (options) {
    const types = options.types

    const length = longest(Object.keys(types)).length + 1
    const choices = map(types, (type, key) => ({
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
        prompter(cz, commit) {
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
                    message: defaultConfig.type.description,
                    choices,
                    default: options.defaultType,
                },
                {
                    type: 'input',
                    name: 'scope',
                    message: defaultConfig.scope.description,
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
                            `${defaultConfig.subject.description} (?????? ${maxSummaryLength(options, answers)
                            } ?????????):\n`
                        )
                    },
                    default: options.defaultSubject,
                    validate(subject, answers) {
                        const filteredSubject = filterSubject(subject, options.disableSubjectLowerCase)
                        // eslint-disable-next-line no-nested-ternary
                        return filteredSubject.length === 0
                            ? 'subject ????????????'
                            : filteredSubject.length <= maxSummaryLength(options, answers)
                                ? true
                                : `subject ??????????????????????????? ${maxSummaryLength(options, answers)
                                } ?????????. ??????????????? ${filteredSubject.length
                                } ?????????.`
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
                    message: defaultConfig.body.description,
                    default: options.defaultBody,
                },
                {
                    type: 'confirm',
                    name: 'isBreaking',
                    message: defaultConfig.isBreaking.description,
                    default: false,
                },
                {
                    type: 'input',
                    name: 'breakingBody',
                    default: '-',
                    message: defaultConfig.breakingBody.description,
                    when(answers) {
                        return answers.isBreaking && !answers.body
                    },
                    validate(breakingBody) {
                        return (
                            breakingBody.trim().length > 0 ||
                            'BREAKING CHANGE ??????????????? body!'
                        )
                    },
                },
                {
                    type: 'input',
                    name: 'breaking',
                    message: defaultConfig.breaking.description,
                    when(answers) {
                        return answers.isBreaking
                    },
                },

                {
                    type: 'confirm',
                    name: 'isIssueAffected',
                    message: defaultConfig.isIssueAffected.description,
                    default: !!options.defaultIssues,
                },
                {
                    type: 'input',
                    name: 'issuesBody',
                    default: '-',
                    message: defaultConfig.issuesBody.description,
                    when(answers) {
                        return (
                            answers.isIssueAffected && !answers.body && !answers.breakingBody
                        )
                    },
                },
                {
                    type: 'input',
                    name: 'issues',
                    message: defaultConfig.issues.description,
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

                // Wrap these lines at options.maxLineWidth characters
                const body = answers.body ? wrap(answers.body, wrapOptions) : false

                // Apply breaking change prefix, removing it if already present
                let breaking = answers.breaking ? answers.breaking.trim() : ''
                breaking = breaking
                    ? `BREAKING CHANGE: ${breaking.replace(/^BREAKING CHANGE: /, '')}`
                    : ''
                breaking = breaking ? wrap(breaking, wrapOptions) : false

                const issues = answers.issues ? wrap(answers.issues, wrapOptions) : false

                commit(filter([head, body, breaking, issues]).join('\n\n'))
            })
        },
    }
}
