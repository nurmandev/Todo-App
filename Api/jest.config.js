module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/setupTests.ts"], // Optional for global setup
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript
  },
};
