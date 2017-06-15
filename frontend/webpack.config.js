const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin('stylesheet/[name]_less.css');

module.exports = {
    context: __dirname,
    devtool: "#eval",

    entry: './assets/js/App', 

    output: {
        path: path.resolve('./public/bundles/'),
        filename: '[name].js',
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env':{
                  'NODE_ENV': JSON.stringify('development'),
                  'appId': JSON.stringify('1850394608544081')
            }
        }),
        extractLess
    ],

    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', { modules: false }],
                                'react',
                            ],
                        }
                    }
                ]
            }, {
                test: /\.less$/,
                use: extractLess.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ]
                }),
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        absolute: true,
                        name: 'images/[path][name]-[hash:7].[ext]'
                    }
                },
                include: [path.join(__dirname, 'public'), /[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
            }, {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'fonts/[name]-[hash:7].[ext]'
                    }
                },
                include: [path.join(__dirname, 'public'), /[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
            }
        ],
    },
};
