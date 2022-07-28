const { defineConfig } = require('cypress');
const webpackConfig = require('src/webpack/webpack.dev')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8000',
        specPattern: 'cypress/integration/**/*.cy.js',
        supportFile: 'cypress/support/e2e.ts',
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig
        }
    },
});
