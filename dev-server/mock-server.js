const app = require('./mock-routes');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../build_n_deploy/webpack/webpack.dev');
const path = require('path');

const port = 8000;

// @ts-ignore
const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
        middleware.fileSystem.readFileSync(
            path.join(__dirname, '/../frontend_development/index.html')
        )
    );
    res.end();
});

const server = app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== mock-server startet på http://localhost:%s/', port);
});

process.on('SIGTERM', function() {
    server.close();
});
