module.exports = {
	entry: {
		// adicionar aqui para otras paginas php o html
		main: __dirname + '/src/js/main.js',
		usuarios: __dirname + '/src/js/usuarios.js',

	},
	output: {
		path: __dirname + '/dist/js',
		filename: '[name].bundle.js',
		publicPath: '/dist' //corprotec.com/public online
	},
	watch: true,
	module: {
		loaders: [{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader'
			}
		]
	}
};