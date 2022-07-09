/**
 * Created by junxie on 18/5/27.
 */
const path = require('path');
const webpack = require('webpack');

const entryConfig = require('./entry.json');


module.exports = {
    entry: {
        'babel-polyfill': 'babel-polyfill',
        ...entryConfig
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.ids.DeterministicChunkIdsPlugin({
            maxLength: 5
        })
    ],
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                    ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
};
