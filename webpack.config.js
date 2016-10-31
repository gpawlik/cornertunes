var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, '/src/js/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('css/main.css')
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            //loaders: ['style', 'css?postcss-loader', 'sass?sourceMap']            
            loader: ExtractTextPlugin.extract(
                'style', 
                'css!sass', 
                'sass?sourceMap'
            )
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }, 
    postcss: [
        autoprefixer(),
    ],
    resolve: {
        extensions: ['', '.js', '.scss']
    }
}