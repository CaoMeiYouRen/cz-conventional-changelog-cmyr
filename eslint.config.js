// eslint.config.js
import { defineConfig } from 'eslint/config'
import cmyr from 'eslint-config-cmyr'

export default defineConfig([cmyr, {
    rules: {
        'func-style': 0,
        '@stylistic/no-mixed-operators': 0,
    },
}])
