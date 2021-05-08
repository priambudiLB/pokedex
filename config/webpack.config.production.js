const config = require('./webpack.config.js')

const merge = require('webpack-merge')
const BrotliPlugin = require('brotli-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = () => {
  const output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
  return merge(config, {
    mode: 'production',
    devtool: false,
    output: output,
    plugins: [
      // new BundleAnalyzerPlugin(),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg)$/,
        minRatio: 0.8
      })
    ],
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        }),
        new UglifyJsPlugin({
          parallel: true
        })
      ],
      runtimeChunk: {
        name: 'runtime'
      }
      // splitChunks: {
      //   chunks: 'all',
      //   maxInitialRequests: Infinity,
      //   minSize: 0,
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name (module) {
      //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
      //         return `npm.${packageName.replace('@', '')}`
      //       }
      //     }
      //   }
      // }
    }
  })
}
