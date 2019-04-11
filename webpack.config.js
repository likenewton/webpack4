const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

function getEntries(viewPath) {
  const dirs = fs.readdirSync(viewPath);
  let entryMap = {};

  dirs.forEach(function(dir) {
    // 忽略 viewPath 目录下的直接子文件，只算直接子文件夹
    if (dir.indexOf('.') === -1) {
      entryMap[dir] = [
        path.resolve(viewPath, dir + '/index')
      ];
    }
  });

  return entryMap;
}

function getPlugins(viewPath) {
  const dirs = fs.readdirSync(viewPath);
  let pluginMap = [];

  // htmlWebpackPlugin
  dirs.forEach((dir) => {
    if (!dir.includes('.')) {
      pluginMap = [...pluginMap, new HtmlWebpackPlugin({
        inject: 'body',
        template: `view/${dir}.html`,
        filename: `${dir}.html`,
        chunks: [`${dir}`, 'common', 'vendor'],
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      })]
    }
  })

  pluginMap = [...pluginMap,
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'app/assets/static'),
      to: resolve(__dirname, 'dist/static'),
    }])
  ]

  return pluginMap
}

module.exports = {
  // devtool: 'source-map',
  entry: getEntries('./app/pages'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: "js/[name].chunk.js",
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          minChunks: 2,
          priority: 1
        },
        // 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.(html|tpl)$/,
        use: 'html-loader'
      },

      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          },
          'css-loader',
        ],
      },

      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader // 这里不能使用style.loader, 不然无法分离出css文件
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },

      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8760,
    host: '192.168.50.120'
  },

  plugins: getPlugins('./app/pages')
}