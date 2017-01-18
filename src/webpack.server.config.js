const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

let nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	node: {
		console: true,
		__filename: true,
		__dirname: true
	},
	target: 'node',
	devtool: false,
	entry: {
		app: path.resolve(__dirname, "./renderServer.jsx")
	},
	output: {
		path: __dirname + '/bin',
		filename: '[name].js'
	},
	externals: nodeModules,
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		alias: {
			core: path.resolve(__dirname, "./core"),
			components: path.resolve(__dirname, "./components"),
			constants: path.resolve(__dirname, "./constants"),
			util: path.resolve(__dirname, "./util"),
			style: path.resolve(__dirname, "./scss"),
			img: path.resolve(__dirname, "./img"),
			lib: path.resolve(__dirname, "./lib"),
			containers: path.resolve(__dirname, "./containers")
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']}), "awesome-typescript-loader"],
			},
			{
				test: /\.jsx$/,
				use: ['babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})],
			},
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract({
					loader: ["css-loader", "autoprefixer-loader", "sass-loader"]
				})
			},
			// 按原始名称打包压缩的字体文件
			{test: /\.(png|jpg|jpeg|gif)$/, use: 'file-loader'},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: "file-loader?name=fonts/[name].[ext]"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("/css/[name]-[contenthash:8].css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
				ROUTE_HISTORY: JSON.stringify("hash"),
				IS_SERVER: JSON.stringify("server")
			}
		}),
		new CleanPlugin(['bin'], {
			root: path.resolve(__dirname, './'),
			verbose: true,
			dry: false
		})
	]
};