const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const ROOT_DIRECTORY = path.join(__dirname, '..')
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src')

const config = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules']
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'public/index.html')
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: path.join(SRC_DIRECTORY, 'assets'), to: path.join(ROOT_DIRECTORY, 'build') }
          // { from: path.join(SRC_DIRECTORY, 'public'), to: path.join(ROOT_DIRECTORY, 'build') }
        ]
      }
    ),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}

module.exports = config
