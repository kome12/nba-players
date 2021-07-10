module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
