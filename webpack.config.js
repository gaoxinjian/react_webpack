var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './components/index.js');
var BUILD_PATH = path.resolve(__dirname, './build');

module.exports = {
	entry: {
        path: APP_PATH,
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.css?$/,
			loader: 'style-loader!css-loader'
		},{
			test: /\.jsx?$/,
      		loader: ['babel-loader?presets[]=es2015,presets[]=react']
		},{
	      	test: /\.(png|jpg)$/,
	      	loader: 'url-loader?limit=25000'
	    }]
	},
	plugins: [
	    new webpack.optimize.CommonsChunkPlugin({'name':'vendor',  'filename':'vendor.js'}),
	    new ExtractTextPlugin({
		    filename: "bundle.css",
		    disable: false,
		    allChunks: true
		}),
	    new webpack.DefinePlugin({
	      	'process.env': {
	        	'NODE_ENV': JSON.stringify('production')
	      	}
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      	compressor: {
	        	warnings: false
	      	}
	    })
	],
    devServer: {
        hot: true,
	    port: 8098,
        inline: true,
	}
}
