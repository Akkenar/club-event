const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bundle = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PreloadCssPlugin = require('./buildExtra/preload-css-webpack-plugin');
const multi = require('multi-loader');

const cssOrJsRegex = /((.*)\.)(js|css)$/;

const isInspection = process.env.NODE_ENV === 'inspect';
const isProduction = isInspection || process.env.NODE_ENV === 'production';
const buildPath = path.join(__dirname, 'target', 'build');

const devPlugins = [new webpack.HotModuleReplacementPlugin()];

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true,
  }),
  new PreloadCssPlugin({
    chunkNames: ['header', 'footer'],
  }),
  new webpack.NormalModuleReplacementPlugin(
    /src\/environment\/environment\.ts/,
    './environment.prod.ts'
  ),
];

const commonPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new MiniCssExtractPlugin({
    filename: isProduction ? '[name].[contenthash].css' : '[name].css',
    chunkFilename: isProduction ? '[name].[contenthash].css' : '[name].css',
  }),
  new HtmlWebpackPlugin({
    // Looks prettier
    minify: {
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: true,
    },
    filename: 'index.html',
    template: path.join(__dirname, 'src', 'index.html'),
    chunksSortMode: 'none',
    inject: false,
    production: isProduction,
  }),
  new bundle.BundleAnalyzerPlugin({
    analyzerMode: !isInspection ? 'disabled' : 'server',
  }),
  new CopyWebpackPlugin([
    { from: path.join(__dirname, 'src/favicon.ico') },
    { from: path.join(__dirname, 'api/**/*'), to: 'api' },
    {
      from: path.join(__dirname, 'translations/**/*.html'),
      to: 'translations',
    },
    { from: path.join(__dirname, '.htaccess') },
    { from: path.join(__dirname, 'robots.txt') },
  ]),
];

const extraPlugins = isProduction ? prodPlugins : devPlugins;

module.exports = {
  name: 'client',
  target: 'web',
  mode: isProduction ? 'production' : 'development',

  stats: {
    // Disable the verbose output on build
    children: false,
    entrypoints: false,
    warnings: true,
    modules: false,
    // Only display css and js assets
    excludeAssets: name => name.startsWith('api/') || !name.match(cssOrJsRegex),
  },

  resolve: {
    // .js must also be resolved for node_modules dependencies
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
  },

  entry: {
    bundle: './entry.tsx',
  },

  // ref: https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? false : 'source-map',
  optimization: {
    minimize: isProduction,
  },

  // Remove support for node libraries in our build
  // ref: https://github.com/webpack/node-libs-browser
  node: {
    __filename: false,
    __dirname: false,
    assert: false,
    Buffer: false,
    console: false,
    crypto: false,
    dns: false,
    domain: false,
    events: false,
    fs: false,
    net: false,
    os: false,
    path: false,
    process: false,
    punycode: false,
    querystring: false,
    setImmediate: false,
    tty: false,
    url: false,
    util: false,
    vm: false,
    zlib: false,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              reportFiles: ['src/**/*.{ts,tsx}'],
              forceIsolatedModules: true,
            },
          },
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: [/\.svg$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: [/\.jpg$/],
        // Both convert the jpg to webp, and optimize the jpg fallback.
        loader: multi(
          'file-loader?{name:"assets/media/[name].webp"}!image-webpack-loader?{webp:{quality:75}}',
          'file-loader?{name:"assets/media/[name].jpg"}!image-webpack-loader'
        ),
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: [/\.md/],
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
    ],
  },

  context: path.join(__dirname, 'src'),
  output: {
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
    path: buildPath,
  },
  profile: false,
  watch: false,

  devServer: {
    stats: { colors: true },
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8081,
    disableHostCheck: true,
    host: '0.0.0.0',
  },

  plugins: [...commonPlugins, ...extraPlugins],
};
