module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
    testPathIgnorePatterns: ['node_modules'],
  };