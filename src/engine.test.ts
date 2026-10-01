import { describe, expect, it, vi } from 'vitest'
import engine, { filterSubject } from './engine'

vi.mock('@commitlint/load', () => ({
    default: vi.fn(async () => ({})),
}))

interface PromptQuestion {
    name: string
    filter?: (value: string, answers: Record<string, unknown>) => string
    [key: string]: unknown
}

function createOptions() {
    return {
        types: {
            feat: { description: '一个新功能(feature)' },
            fix: { description: '一个错误修复(bug fix)' },
        },
        defaultType: 'feat',
        maxHeaderWidth: 120,
        maxLineWidth: 120,
    }
}

describe('filterSubject', () => {
    it('去除首尾空格并修复 Markdown', () => {
        expect(filterSubject('  修复了bug  ', undefined)).toBe('修复了 bug')
    })

    it('默认将首字母小写（仅影响 ASCII 字母）', () => {
        expect(filterSubject('Fix bug', undefined)).toBe('fix bug')
    })

    it('disableSubjectLowerCase 为真时保留首字母大小写', () => {
        expect(filterSubject('Fix bug', true)).toBe('Fix bug')
    })

    it('移除结尾的点号后修复 Markdown', () => {
        expect(filterSubject('修复了bug.', undefined)).toBe('修复了 bug')
    })
})

describe('engine prompter', () => {
    it('构建提交信息时对 subject 与 body 应用 Markdown 修复', async () => {
        const questions: PromptQuestion[] = []
        const rawAnswers: Record<string, unknown> = {
            type: 'feat',
            scope: '',
            subject: '修复了bug.',
            body: '这是body,内容',
            isBreaking: false,
            isIssueAffected: false,
        }

        const cz = {
            prompt(promptQuestions: PromptQuestion[]) {
                questions.push(...promptQuestions)
                // 模拟 inquirer 依次执行各问题的 filter
                const answers = { ...rawAnswers }
                for (const question of promptQuestions) {
                    if (typeof question.filter === 'function' && typeof answers[question.name] === 'string') {
                        answers[question.name] = question.filter(answers[question.name] as string, answers)
                    }
                }
                return Promise.resolve(answers)
            },
        }

        let commitMessage = ''
        const { prompter } = engine(createOptions())
        await prompter(cz, (message: string) => {
            commitMessage = message
        })

        expect(commitMessage).toContain('feat: 修复了 bug')
        expect(commitMessage).toContain('这是 body,内容')
    })
})
