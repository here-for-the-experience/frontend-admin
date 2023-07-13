module.exports = {
    preset: "ts-jest",
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
      "\\.(css)$": "<rootDir>/node_modules/jest-css-modules-transform",
    },
    collectCoverageFrom: [
      "src/pages/*.{js,jsx}",
      "!src/main.jsx",
      "!src/vite-env.d.js",
    ],
    // coverageThreshold: {
    //   global: {
    //     branches: 50,
    //     functions: 80,
    //     lines: 80,
    //     statements: -10,
    //   },
    // },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
      "/node_modules/(?!react-toastify)/.+\\.css$", // Exclude CSS files from all node_modules except react-toastify
    ],
  };
  