// vue.config.js
const path = require('path')
const NODE_ENV = process.env.NODE_ENV

let config = {
    // 选项...
    configureWebpack: {
        resolve: {
            // 自动解析确定的扩展名
            extensions: ['.vue', '.js'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve(__dirname, './src')
            }
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        test: /node_modules/,
                        name: "vendor",
                        minChunks: 1,
                        maxInitialRequests: 12,
                        minSize: 0,
                        priority: 100,
                    },
                    common: {
                        chunks: "all",
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: "common",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
    }
}

if (NODE_ENV === "production") {
    config.configureWebpack.devtool = "none"
    config.publicPath = "./"

    // const CompressionWebpackPlugin = require('compression-webpack-plugin');
    // config.configureWebpack.plugins = [
    //     new CompressionWebpackPlugin({
    //         filename: '[path].gz[query]',
    //         algorithm: 'gzip',
    //         test: /\.js$|\.json$|\.css/,
    //         threshold: 0, // 只有大小大于该值的资源会被处理
    //         minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //         deleteOriginalAssets: true // 删除原文件
    //     })
    // ]
} else {
    config.configureWebpack.devServer = {
        overlay: {
            warnings: false,
            errors: true
        },
        // lintOnSave: false
    }
    config.configureWebpack.devtool = "cheap-module-eval-source-map"
    config.publicPath = "/"
}

module.exports = config
