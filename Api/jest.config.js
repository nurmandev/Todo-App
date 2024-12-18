module.exports = {
    testEnvironment: 'node', // Ensures compatibility with Express apps
    coverageDirectory: './coverage', // Generates a coverage report
    collectCoverage: true,
    setupFilesAfterEnv: ['./jest.setup.js'], // Optional for shared setup
  };
  