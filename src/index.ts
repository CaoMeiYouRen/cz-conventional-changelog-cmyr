import conventionalCommitTypes from 'conventional-commit-types' assert { type: 'json' }
import { configLoader } from 'commitizen'
import engine from './engine'
import defaultConfig from './config'

const config = configLoader.load() || {}
const options = {
    types: config.types || defaultConfig.type.enum || conventionalCommitTypes.types,
    defaultType: process.env.CZ_TYPE || config.defaultType,
    defaultScope: process.env.CZ_SCOPE || config.defaultScope,
    defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
    defaultBody: process.env.CZ_BODY || config.defaultBody,
    defaultIssues: process.env.CZ_ISSUES || config.defaultIssues,
    disableScopeLowerCase:
        process.env.DISABLE_SCOPE_LOWERCASE || config.disableScopeLowerCase,
    disableSubjectLowerCase:
        process.env.DISABLE_SUBJECT_LOWERCASE || config.disableSubjectLowerCase,
    maxHeaderWidth:
        process.env.CZ_MAX_HEADER_WIDTH
        && parseInt(process.env.CZ_MAX_HEADER_WIDTH)
        || config.maxHeaderWidth
        || 100,
    maxLineWidth:
        process.env.CZ_MAX_LINE_WIDTH
        && parseInt(process.env.CZ_MAX_LINE_WIDTH)
        || config.maxLineWidth
        || 100,
}

try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const commitlintLoad = require('@commitlint/load')
    commitlintLoad().then((clConfig) => {
        if (clConfig.rules) {
            const maxHeaderLengthRule = clConfig.rules['header-max-length']
            if (
                typeof maxHeaderLengthRule === 'object'
                && maxHeaderLengthRule.length >= 3
                && !process.env.CZ_MAX_HEADER_WIDTH
                && !config.maxHeaderWidth
            ) {
                options.maxHeaderWidth = maxHeaderLengthRule[2]
            }
        }
    })
} catch (error) {
    //
}

export default engine(options)
