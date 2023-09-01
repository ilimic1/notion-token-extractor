/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '../../src/(.*)': '<rootDir>/build/$1',
  },
  testMatch: ['<rootDir>/build-tests/**/(*.)+(spec|test).[jt]s?(x)'],
};
