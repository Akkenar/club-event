import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as bundle from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HTMLInlineCSSWebpackPlugin from 'html-inline-css-webpack-plugin';

const isInspection = process.env.NODE_ENV === 'inspect';
const isProduction = isInspection || process.env.NODE_ENV === 'production';
const buildPath = path.join(__dirname, 'target', 'build');

const devPlugins = [new webpack.HotModuleReplacementPlugin()];

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

const commonPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[name].[hash].css',
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
  new HTMLInlineCSSWebpackPlugin({
    filter(fileName) {
      return fileName.includes('critical');
    },
  }),
  new bundle.BundleAnalyzerPlugin({
    analyzerMode: !isInspection ? 'disabled' : 'server',
  }),
  new CopyWebpackPlugin([
    { from: path.join(__dirname, 'src/favicon.ico') },
    { from: path.join(__dirname, 'api/**/*'), to: 'api' },
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
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },

  entry: {
    bundle: './entry.js',
  },

  // ref: https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? false : 'inline-cheap-module-eval-source-map',
  optimization: {
    minimize: isProduction,
    splitChunks: {
      cacheGroups: {
        default: false,
        // Custom common chunk
        bundle: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          reuseExistingChunk: false,
          priority: -30,
        },
      },
    },
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
          name: 'assets/media/[name].[hash:8].[ext]',
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
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
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
