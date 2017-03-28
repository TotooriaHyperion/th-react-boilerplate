"use strict";
const webpack = require('webpack');
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getAllFileArray(dirname) {
	return fs.readdirSync(dirname).reduce(function (prev, current) {
		if (!fs.statSync(path.join(dirname, current)).isDirectory()) {
			prev.push(path.join(dirname, current));
		}
		return prev;
	}, []);
}

let settings = {
	devtool: "hidden-source-map",
	entry: {
		app: ['whatwg-fetch', path.resolve(__dirname, "../src/main.tsx")],
		libs: [].concat(getAllFileArray(path.resolve(__dirname, '../src/lib/'))),
		commons: [].concat(getAllFileArray(path.resolve(__dirname, '../src/util/')))
			.concat(getAllFileArray(path.resolve(__dirname, '../src/constants/')))
			.concat([]),
		core: [
			path.resolve(__dirname, "../src/core/index"),
			path.resolve(__dirname, "../src/core/rootReducers"),
			path.resolve(__dirname, "../src/core/ReduxConnector"),
			path.resolve(__dirname, "../src/core/ReduxComponent")
		],
		utils: [
			'moment',
			'classnames'
		],
		components: [
			'redux-form'
		],
		vendors: [
			'immutable',
			'babel-polyfill',
			'react',
			'react-dom',
			'react-router',
			'redux',
			'react-redux',
			'react-router-redux',
		],
	},
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
				use: ["style-loader", {
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
				use: ["style-loader", {
					loader: "css-loader",
					options: {
						importLoaders: 1
					}
				}, "postcss-loader", "sass-loader"]
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
		// moment的国际化支持只保留中文和英文
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|cn/),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				ROUTE_HISTORY: JSON.stringify("browser")
			}
		})
	],
	performance: {
		// maxEntrypointSize: 400000,
		hints: false
	}
};

module.exports = settings;
