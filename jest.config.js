const nextJest = require('next/jest');

// From: https://nextjs.org/docs/app/building-your-application/testing/jest

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  
  // Setup files that will run before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Handle module path aliases (must match tsconfig.json or jsconfig.json)
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
  },

  // Ignore patterns to avoid running tests in unnecessary locations
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // Support for CSS and static assets
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};

module.exports = createJestConfig(config);
