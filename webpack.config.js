var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');
module.exports = {
    //entry: './src/main.js',
    entry: [   'webpack-dev-server/client?http://localhost:8080', //资源服务器地址
           'webpack/hot/dev-server',    './src/main.js'
    ],
    output: {
        path: './dist',
        publicPath: 'http://localhost:8080/', //发布时用./dist/，平时用http://localhost:8080/
        filename: 'build.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css']
    },
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.(css|scss)$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'static/mimage/[name].[ext]?[hash:7]'
            }
        }]
    },
    vue: {
        loaders: {
            js: 'babel',
            html: 'vue-html-loader',
            css: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('static/css/style.css', {
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname, './index.html'),
            inject: true
        })
    ],
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
}