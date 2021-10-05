module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['./index.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!sma-cache)'],
  reporters: ['default'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts'],
  slowTestThreshold: 15,
  moduleNameMapper: {
    "(.*)\\.js": "$1"
  }
}
