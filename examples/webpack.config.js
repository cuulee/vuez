const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {

		devtool: 'inline-source-map',

		entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
				const fullDir = path.join(__dirname, dir)
				const entry = path.join(fullDir, 'app.js')
				if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
						entries[dir] = ['webpack-hot-middleware/client', entry]
				}

				return entries
		}, {}),

		output: {
				path: path.join(__dirname, '__build__'),
				filename: '[name].js',
				chunkFilename: '[id].chunk.js',
				publicPath: '/__build__/'
		},

		module: {
				loaders: [{
						test: /\.js$/,
						exclude: /(bower_components|node_modules)/,
						loader: 'babel',
						},
						{
								test: /\.vue$/,
								loader: 'vue-loader',
						}],
		},

		resolve: {
				alias: {
						vuez: path.resolve(__dirname, '../src/index.js')
				}
		},

		plugins: [
				new webpack.optimize.CommonsChunkPlugin({
						name: 'shared',
						filename: 'shared.js'
				}),
				new webpack.DefinePlugin({
						'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
				}),
				new webpack.HotModuleReplacementPlugin(),
				// new webpack.NoEmitOnErrorsPlugin()
		]

}
