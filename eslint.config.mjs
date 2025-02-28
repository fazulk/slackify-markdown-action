import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: false,
  stylistic: true,
}, {
  ignores: [
    '**/*.yml',
  ],
})
