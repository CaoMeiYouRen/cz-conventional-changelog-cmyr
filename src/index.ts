import conventionalCommitTypes from 'conventional-commit-types' assert { type: 'json' }
import { configLoader } from 'commitizen'
import commitlintLoad from '@commitlint/load'
import engine from './engine'
import defaultConfig from './config'

/**
 * 深度合并配置对象
 * @param target 目标配置对象
 * @param source 源配置对象
 * @returns 合并后的配置对象
 */
function deepMergeConfig(target: any, source: any): any {
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

let questions = defaultConfig

try {
    commitlintLoad().then((clConfig) => {
        // console.log(clConfig)

        // 使用深度合并策略：defaultConfig 作为基础，clConfig.prompt.questions 作为覆盖
        if (clConfig?.prompt?.questions) {
            questions = deepMergeConfig(defaultConfig, clConfig.prompt.questions)
        } else {
            questions = defaultConfig
        }
        // console.log(questions)
        if (clConfig?.rules) {
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

export default engine(options, questions)
