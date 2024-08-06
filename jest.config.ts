
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest', // Preset to use TypeScript through ts-jest
    testEnvironment: 'node', // Environment under which the tests will be run
    collectCoverage: true, // Enable coverage collection
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions to process
    modulePathIgnorePatterns: ["<rootDir>/cdk.out/"], // Ignore cdk.out directory to prevent module naming collisions
    testPathIgnorePatterns: ["/node_modules/", "/cdk.out/"], // Ignore node_modules and cdk.out in test paths
    coveragePathIgnorePatterns: ["/node_modules/", "/cdk.out/"],
    maxWorkers: 1, // Ajuste o número de workers para controlar o uso de memória
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    logHeapUsage: true,
    // Incluir todos os arqui // Avoid collecting coverage from these directories
    transform: {
        '^.+\\.ts$': 'ts-jest', // Use ts-jest for transpiling TypeScript files
    },
};

export default config;
