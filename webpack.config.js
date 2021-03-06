const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log('env.NODE_ENV:', process.env.NODE_ENV)
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: {
    dashboard: './src/dashboard.js',
    manage: './src/manage.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  cache: true,
  devServer: {
    port: 3000,
    hot: true,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'demo')],
    overlay: true
  },
  externals: {
    // 库已经在页面中引入，使用全局变量代替对库的引用，库内容不用再打包到app.js中
    'vue': 'Vue',
    'element-ui': 'ELEMENT',
    'echarts': 'echarts',
    'vue-echarts': 'VueECharts'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve('src/lib')],
        include:[
          path.resolve('src'),
          path.resolve('node_modules/@shopify')
        ],
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: getBabelConfig()
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 222,
              name: 'assets/images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist/*.js', 'dist/*.map']),
    new CopyWebpackPlugin([
      {
        from: 'src/*.html',
        to: '[name].[ext]',
        toType: 'template'
      },
      {
        from: 'src/*.css',
        to: '[name].[ext]',
        toType: 'template'
      },
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'src/lib',
        to: 'lib'
      }
    ])
  ]
}

function getBabelConfig () {
  return {
    'presets': [
      [
        'env', {
          'targets': {
            'browsers': env=='dev:ie' ? ['ie >= 9']:['edge >= 15']
          },
          'modules': false,
          'useBuiltIns': false,
          'debug': false
        }
      ]
    ]
  }
}
