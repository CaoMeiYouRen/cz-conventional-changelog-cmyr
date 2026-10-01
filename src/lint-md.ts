import { fixMarkdown, RULE_SEVERITY, type LintMdRulesConfig } from '@lint-md/core'

/**
 * 提交信息 Markdown 规范化的规则配置。
 *
 * 仅保留通用文本修复规则，并显式关闭以下规则，避免自动修复提交信息中的
 * 代码块、标题标点与中文半角标点：
 * - `no-empty-code` / `no-empty-code-lang` / `no-empty-inline-code`：允许空代码块与行内代码
 * - `no-long-code`：不限制代码块行长度
 * - `correct-title-trailing-punctuation`：保留标题末尾标点
 * - `no-half-width-punctuation`：保留中文语境下的半角标点
 *
 * 注意：规则名必须与 `@lint-md/core` 2.x 内置规则 ID 完全一致，
 * 否则 `fixMarkdown` 会抛出「未知规则」异常。
 */
export const LINT_MD_RULES: LintMdRulesConfig = {
    'no-empty-code': RULE_SEVERITY.OFF,
    'no-empty-code-lang': RULE_SEVERITY.OFF,
    'no-empty-inline-code': RULE_SEVERITY.OFF,
    'no-long-code': RULE_SEVERITY.OFF,
    'correct-title-trailing-punctuation': RULE_SEVERITY.OFF,
    'no-half-width-punctuation': RULE_SEVERITY.OFF,
}

/**
 * 修复 Markdown 文本，用于规范化提交信息内容。
 * @param markdown 待修复的 Markdown 文本
 * @returns 修复后的 Markdown 文本
 */
export function lintMd(markdown: string): string {
    return fixMarkdown(markdown, { rules: LINT_MD_RULES }).fixedResult.result
}
