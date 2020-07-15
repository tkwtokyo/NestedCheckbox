const Autoprefixer = require('autoprefixer');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'js/TopController': './app/js/top/TopController.js',
        'css/top/index': './app/scss/top/index.scss',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                Autoprefixer({
                                    grid: true,
                                }),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        })
    ],
};
