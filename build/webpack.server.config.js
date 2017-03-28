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
		app: path.resolve(__dirname, "../src/renderServer.jsx")
	},
	output: {
		path: path.resolve(__dirname, '../bin'),
		filename: '[name].js'
	},
	externals: nodeModules,
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		alias: {
			core: path.resolve(__dirname, "../src/core"),
			components: path.resolve(__dirname, "../src/components"),
			constants: path.resolve(__dirname, "../src/constants"),
			util: path.resolve(__dirname, "../src/util"),
			style: path.resolve(__dirname, "../src/scss"),
			img: path.resolve(__dirname, "../src/img"),
			lib: path.resolve(__dirname, "../src/lib"),
			containers: path.resolve(__dirname, "../src/containers")
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']}), "awesome-typescript-loader"],
			},
			{
				test: /\.jsx?$/,
				use: ['babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})],
			},
			// 局部样式使用css-modules，全局样式不使用。
			{
				test: /\.s?css$/,
				exclude: path.resolve(__dirname,"../src/scss"),
				use: ["isomorphic-style-loader", {
					loader: "css-loader",
					options: {
						importLoaders: 1,
						modules: true,
						localIdentName: "[name]__[local]"
					}
				}, "postcss-loader", "sass-loader"]
			},
			{
				test: /\.s?css$/,
				include: path.resolve(__dirname,"../src/scss"),
				use: ExtractTextPlugin.extract({
					fallback: "isomorphic-style-loader",
					use: [{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					}, "postcss-loader", "sass-loader"]
				})
			},
			// 按原始名称打包压缩的字体文件
			{test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader?limit=6400&name=styles/images/[name].[ext]'},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader?limit=6400&mimetype=application/font-woff&name=fonts/[name].[ext]"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader?limit=6400&mimetype=application/octet-stream&name=fonts/[name].[ext]"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: "file-loader?limit=6400&name=fonts/[name].[ext]"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader?limit=6400&mimetype=image/svg+xml&name=fonts/[name].[ext]"
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
			root: path.resolve(__dirname, '../'),
			verbose: true,
			dry: false
		})
	]
};