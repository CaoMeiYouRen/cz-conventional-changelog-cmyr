import conventionalCommitTypes from 'conventional-commit-types' with { type: 'json' }
import * as commitizen from 'commitizen'
import engine from './engine'
import defaultConfig from './config'

const cz = (commitizen && typeof commitizen === 'object' && 'default' in commitizen && commitizen.default)
    ? commitizen.default
    : commitizen

const { configLoader } = cz

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
        || 120,
    maxLineWidth:
        process.env.CZ_MAX_LINE_WIDTH
        && parseInt(process.env.CZ_MAX_LINE_WIDTH)
        || config.maxLineWidth
        || 120,
}

export default engine(options)
