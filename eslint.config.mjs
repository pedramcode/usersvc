import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: [
      "./src/**/*.{js,mjs,cjs,ts,mts,cts}",
      "./tests/**/*.{js,mjs,cjs,ts,mts,cts}",
    ],
    rules: {
      'no-unused-vars': 'off',
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }
);