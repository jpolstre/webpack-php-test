const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
	entry: {
		// adicionar para otras paginas php o html
		// main: __dirname + '/src/js/main.js',
		// usuarios: __dirname + '/src/js/usuarios.js',
		// productos: __dirname + '/src/js/productos.js',

		login: __dirname + '/src/js/login.js',

	},
	watch: true,
	output: {
		path: __dirname + '/dist/public/js',
		publicPath: '/dist', //corprotec.com/public online
		filename: '[name].bundle.js'
	},

	module: {
		// loaders:[
		// 	{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
		// ] ok.

		rules: [{
			test: /(\.js|\.jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			options: {
				presets: [['es2015', { loose: true }], 'react'],
			},
		},
		{
		test: /\.styl$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: ['css-loader', 'stylus-loader']
				})
	},
	{
		test: /\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'sass-loader']
		})
	}
	]
},

plugins: [
		// new webpack.optimize.UglifyJsPlugin(), //only production.
		new ExtractTextPlugin({
			filename: (getPath) => {
				return getPath('../css/[name].css');
			},
			allChunks: true
		}),
		// new OptimizeCssAssetsPlugin()
		]

	};
	module.exports = config;