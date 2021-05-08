const config = require('./webpack.config.js')

const merge = require('webpack-merge')
const BrotliPlugin = require('brotli-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
        threshold: 10240,
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
        })
      ],
      concatenateModules: true,
      splitChunks: {
        chunks: 'async',
        maxInitialRequests: Infinity,
        minSize: 0,
        // maxSize: 100000,
        cacheGroups: {
          // Split vendor code to its own chunk(s)
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'async',
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        //   states: {
        //     test: /[\\/]src[\\/]js[\\/]application[\\/]/,
        //     chunks: 'all',
        //     name: 'states'
        //   }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    }
  })
}
