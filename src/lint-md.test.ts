import * as lintMdCore from '@lint-md/core'
import { describe, expect, it } from 'vitest'
import { LINT_MD_RULES, lintMd } from './lint-md'

interface LintMdRuleLike {
    meta: {
        name: string
    }
}

/**
 * 判断 @lint-md/core 的导出项是否为内置规则对象。
 */
function isLintMdRule(value: unknown): value is LintMdRuleLike {
    if (typeof value !== 'object' || value === null || !('meta' in value)) {
        return false
    }
    return typeof (value as LintMdRuleLike).meta?.name === 'string'
}

// @lint-md/core 中所有内置规则的规则名集合
const exportedValues: unknown[] = Object.values(lintMdCore)
const knownRuleNames = new Set(
    exportedValues
        .filter(isLintMdRule)
        .map((rule) => rule.meta.name),
)

describe('LINT_MD_RULES', () => {
    it('@lint-md/core 应导出内置规则', () => {
        expect(knownRuleNames.size).toBeGreaterThan(0)
    })

    it('所有配置的规则名都必须是内置规则，避免未知规则导致异常', () => {
        for (const ruleName of Object.keys(LINT_MD_RULES)) {
            expect(knownRuleNames.has(ruleName), `未知规则: ${ruleName}`).toBe(true)
        }
    })

    it('不再使用 0.x 时代的废弃规则名', () => {
        expect(LINT_MD_RULES).not.toHaveProperty('no-trailing-punctuation')
        expect(LINT_MD_RULES).not.toHaveProperty('no-empty-inlinecode')
    })

    it('所有规则级别都是合法的 severity', () => {
        for (const severity of Object.values(LINT_MD_RULES)) {
            expect([0, 1, 2]).toContain(severity)
        }
    })
})

describe('lintMd', () => {
    it('不会因为未知规则配置而抛出异常（回归测试）', () => {
        expect(() => lintMd('修复了bug')).not.toThrow()
    })

    it('修复中英文之间的空格', () => {
        expect(lintMd('修复了bug')).toBe('修复了 bug')
    })

    it('保留中文语境下的半角标点', () => {
        expect(lintMd('修复 bug,并优化')).toBe('修复 bug,并优化')
    })

    it('保留标题末尾的标点', () => {
        expect(lintMd('# 标题。')).toBe('# 标题。')
    })

    it('保留空代码块与空行内代码', () => {
        expect(lintMd('```\n```')).toBe('```\n```')
        expect(lintMd('空内联 ``')).toBe('空内联 ``')
    })

    it('空字符串返回空字符串', () => {
        expect(lintMd('')).toBe('')
    })
})
