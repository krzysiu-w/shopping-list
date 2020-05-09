const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './js/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [{
                loader: 'style-loader', 
            }, {
                loader: 'css-loader', 
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () { 
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }, {
                loader: 'sass-loader' // compiles Sass to CSS
            }]
        },{
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            use: ['file-loader']
        } ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};