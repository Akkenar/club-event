import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as bundle from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PreloadCssPlugin from './buildExtra/preload-css-webpack-plugin';

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
  new PreloadCssPlugin(),
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

export default {
  name: 'client',
  target: 'web',
  mode: isProduction ? 'production' : 'development',

  stats: {
    // Disable the verbose output on build
    children: false,
    entrypoints: false,
    warnings: false,
    modules: false,
    // Only display css and js assets
    excludeAssets: name => name.startsWith('api/') || !name.match(cssOrJsRegex),
  },

  resolve: {
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: [/\.webp$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'assets/fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.md/],
        loader: [
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
  },

  plugins: [...commonPlugins, ...extraPlugins],
};
