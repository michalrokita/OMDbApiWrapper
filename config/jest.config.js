const path = require('path')

module.exports = {
    rootDir: path.join(__dirname, '..'),
    verbose: true,
    testMatch: ['<rootDir>/tests/*.test.js'],
    testPathIgnorePatterns: [
        '/node_modules/',
    ]
}
