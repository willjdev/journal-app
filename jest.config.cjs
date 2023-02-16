module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [], //Con esto se especifica los patrones que se desea que Jest ignore, para evitar que haga trasnpilaciones o demas
}