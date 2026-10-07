/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/practice/**/*.test.tsx', '<rootDir>/src/pages/Dashboard/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/practice/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          module: 'commonjs',
          moduleResolution: 'bundler',
          ignoreDeprecations: '6.0',
          target: 'ES2022',
          strict: true,
          skipLibCheck: true,
          isolatedModules: true,
          types: ['jest', 'node'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(png|svg)$': '<rootDir>/src/test/fileMock.cjs',
    '^@/(.*)\\.tsx$': '<rootDir>/src/$1',
    '^@/(.*)\\.ts$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.tsx$': '$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1',
  },
}
