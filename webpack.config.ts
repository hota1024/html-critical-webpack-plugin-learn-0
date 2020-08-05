import * as path from 'path'
import * as glob from 'glob'
import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin'

const config: Configuration = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`src/**/*`, { nodir: true }),
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.join(path.resolve(__dirname), 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      width: 1920,
      height: 1080,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
}

export default config
