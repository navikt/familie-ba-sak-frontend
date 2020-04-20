"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mock_routes_1 = tslib_1.__importDefault(require("./mock-routes"));
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const webpack_dev_middleware_1 = tslib_1.__importDefault(require("webpack-dev-middleware"));
const webpack_hot_middleware_1 = tslib_1.__importDefault(require("webpack-hot-middleware"));
const path_1 = tslib_1.__importDefault(require("path"));
const config = require('../../build_n_deploy/webpack/webpack.dev');
const port = 8000;
const compiler = webpack_1.default(config);
const middleware = webpack_dev_middleware_1.default(compiler, {
    publicPath: config.output.publicPath,
});
mock_routes_1.default.use(middleware);
mock_routes_1.default.use(webpack_hot_middleware_1.default(compiler));
mock_routes_1.default.get('/*', (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(middleware.fileSystem.readFileSync(path_1.default.join(__dirname, '/../../frontend_development/index.html')));
    res.end();
});
const server = mock_routes_1.default.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== mock-server startet på http://localhost:%s/', port);
});
process.on('SIGTERM', function () {
    server.close();
});
//# sourceMappingURL=server.js.map