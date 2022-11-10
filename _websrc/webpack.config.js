/* eslint-disable import/no-extraneous-dependencies */
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

/* CRITICAL CSS */
// const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const argv   = require('yargs').argv;
const timestamp = new Date().getTime();

module.exports = {
  mode: 'production',
  // mode: 'development',
  target: ['web', 'es5'],
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },

  //CUSTOM
  // entry: {
  //   'assets/js': './assets/_src/js/master/main.js', // will be  ./build/application/bundle.js,
  //   'assets/js': './assets/_src/js/app/app.js', // will be  ./build/application/bundle.js,
  //   // 'build/library/bundle': './src/library' // will be  ./build/library/bundle.js
  // },
  output: {
    // path: path.resolve(__dirname, 'dist1'),
    // filename: 'foo.bundle.js',
    // chunkFilename: './assets/js/[name].js',
    // chunkFilename: '[name].js',
    // path: '/assets/js/',
    publicPath: '/assets/js/',
    // filename: '[name].js'

    // https://github.com/webpack/webpack/issues/959
    chunkFilename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : 'chunk.[name].[chunkhash].js';
      // return pathData.chunk.name === 'main' ? '[name].js' : `chunk.[name].${timestamp}.js`;
    },
    filename: (pathData) => {
      return '[name].js';
    },    
    
    // https://github.com/webpack/webpack/issues/2329
    // chunkFilename: `chunk.[name].[chunkhash].js?cb=[chunkhash]`,    


    // https://stackoverflow.com/questions/39238163/how-to-use-cache-busting-with-webpack
    // filename: `[name].js?cb=${timestamp}`,
    // chunkFilename: `chunk.[name].js?cb=${timestamp}`,    
    // path: '/assets/js/',

    // umdNamedDefine: false,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // ecma: undefined,
          // warnings: false,
          // parse: {},
          // compress: {},
          // compress: false,
          // mangle: true, // Note `mangle.properties` is `false` by default.
          // module: false,
          output: {
            comments: false,
          },
          // toplevel: false,
          // nameCache: null,
          // ie8: false,
          // keep_classnames: undefined,
          // keep_fnames: false,
          // safari10: false,

        },
      }),
    ],
    minimize: (argv.skipJSMin !== 'true'),

    // https://github.com/webpack/webpack/issues/959
    // concatenateModules: false,
    // providedExports: false,
    // usedExports: false,
  },

  /* CRITICAL CSS */
  // plugins: [
  //   new CriticalPlugin({
  //     base: path.resolve('_layouts'),
  //     src: 'default.html',
  //     inline: true,
  //     minify: true,
  //     dest: '_layouts/default.html',
  //     css: ['assets/css/main.css'],
  //   }),
  // ],


  // entry: {
  //   app: './_src/index.js',
  // },
  // plugins: [
  //   new FaviconsWebpackPlugin({
  //     logo: './icon.png',
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: './_src/template/default.html',
  //     filename: '../_layouts/default.html',
  //   }),
  //   new ExtractTextPlugin('[name].css'),
  //   new CopyWebpackPlugin([{
  //     from: path.resolve('images'),
  //     to: 'images/',
  //   }]),
  // ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['env'],
  //         },
  //       },
  //     },
  //     {
  //       test: /\.(css|scss)$/,
  //       use: ExtractTextPlugin.extract({
  //         fallback: 'style-loader',
  //         use: [
  //           { loader: 'css-loader', options: { importLoaders: 1 } },
  //           {
  //             loader: 'postcss-loader',
  //             options: {
  //               config: {
  //                 path: 'config/postcss.config.js',
  //               },
  //             },
  //           },
  //           { loader: 'sass-loader' },
  //         ],
  //       }),
  //     },
  //     {
  //       test: /\.(png|svg|jpg|gif)$/,
  //       use: [
  //         'file-loader',
  //       ],
  //     },
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/,
  //       use: [
  //         'file-loader',
  //       ],
  //     },
  //   ],
  // },
};
