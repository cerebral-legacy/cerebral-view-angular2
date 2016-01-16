var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'Angular2 View layer package for Cerebral',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};

var config = {
  metadata: metadata,
  entry: {
    'vendor': './app/vendor.ts',
    'main': './app/main.ts'
  },
  devtool: 'eval-source-map',
  output: {
    path: root('build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['','.ts','.js','.json','.css','.html']
  },
  module: {
    preLoaders: [{ test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/] }],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /node_modules\/(?!(ng2-.+))/ ]
      },
      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },
      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader' }
    ]
  },
  tslint: {
    emitErrors: false,
    failOnHint: false
  },
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'app/index.html', inject: false })
  ],
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

module.exports = config;