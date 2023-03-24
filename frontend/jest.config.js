const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./src",
});
const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/", "src"],
    testEnvironment: "jest-environment-jsdom",
    preset: 'ts-jest',
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/fileTransformer.js',
        '^.+\\.tsx?$': 'ts-jest',
    },
    "moduleNameMapper": {
        "@/(.*)": "<rootDir>/src/$1"
    },
    // moduleFileExtensions: [
    //     "js",
    //     "ts",
    //     "tsx",
    //     "json",
    //     "jsx",
    //     "node"
    //   ],
    //   transformIgnorePatterns: [
    //     "/node_modules/",
    //     "\\.pnp\\.[^\\/]+$"
    //   ],
    //   // ...
    //   transform: {
    //     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    //     "^.+\\.svg$": "<rootDir>/svgTransform.js" // add this line
    // },
};
module.exports = createJestConfig(customJestConfig);