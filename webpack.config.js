const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: './src/popup.js',
        background: './src/background.js',
        content_script: './src/content_script.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: "source-map",
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'popup.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json', to: 'manifest.json' },
                { from: './src/icon48.png', to: 'icon.png' },
                { from: './src/styles.css', to: 'styles.css' }
            ],
        }),
    ],
};
