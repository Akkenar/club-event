import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const buildPath = path.join(__dirname, 'target', 'build');

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
        // Extract the critical CSS into a dedicated file
        styles: {
          name: 'critical',
          test: /(\.critical)\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
          // It's essential that the priority of the critical styles is
          // greater than the priority of the commons, otherwise
          // Webpack will put critical styles in commons.css.
          priority: -20,
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
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  context: path.join(__dirname, 'src'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: buildPath
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

  plugins: [
    new CleanWebpackPlugin([buildPath], { verbose: false }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: !isProduction,
      cache: true,
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        mangle: true,
        output: {
          comments: false,
          beautify: false,
        },
        compress: true,
        warnings: false,
      },
    }),
    new OptimizeCSSAssetsPlugin({
      // Disable reducing z-index value
      // to avoid such issues like reducing 2002 to 6 after optimisation
      cssProcessorOptions: { zindex: false },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
