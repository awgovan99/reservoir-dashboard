module.exports = {
    testEnvironment: "jsdom", // Simulates a browser-like environment for React
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Runs before tests
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    },
  };