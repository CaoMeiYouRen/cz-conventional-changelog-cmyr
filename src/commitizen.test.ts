import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)

describe('commitizen 配置加载', () => {
    it('能够找到 cz 配置（防止 glob override 再次破坏配置查找）', () => {
        const { configLoader } = require('commitizen')
        const config = configLoader.load()
        expect(config).toMatchObject({ path: expect.any(String) })
    })
})
