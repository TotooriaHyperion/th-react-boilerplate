"use strict";

const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

function getAllFileArray(dirname) {
	return fs.readdirSync(dirname).reduce(function (prev, current) {
		if (!fs.statSync(path.join(dirname, current)).isDirectory()) {
			prev.push(path.join(dirname, current));
		}
		return prev;
	}, []);
}

let settings = {
	devtool: 'source-map',
	entry: {
		entry: ['whatwg-fetch', path.resolve(__dirname, "../src/index.tsx")],
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
	output: {
		publicPath: 'http://localhost:9091/',
		filename: '[name].js',
		chunkFilename: "[id].chunk.js"
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
				use: ['react-hot-loader', 'babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']}), "awesome-typescript-loader"],
			},
			{
				test: /\.jsx$/,
				use: ['babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})],
			},
			// {
			// 	test: /\.s?css$/,
			// 	loader: ExtractTextPlugin.extract({
			// 		fallbackLoader: "style-loader",
			// 		loader: ["css-loader", "autoprefixer-loader", "sass-loader"]
			// 	})
			// },
			// for css hot load
			{
				test: /\.s?css$/,
				use: ["style-loader", "css-loader?importLoaders=1", "postcss-loader", "sass-loader"]
			},
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
		// new webpack.IgnorePlugin(/^react$/),
		// new webpack.IgnorePlugin(/^react-dom$/),
		// new webpack.IgnorePlugin(/^react-router$/),
		// moment的国际化支持只保留中文和英文
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|cn/),
		// 抽出公共模块，manifest用来解决最后一个文件chunkhash不稳定的问题
		new webpack.optimize.CommonsChunkPlugin({
			names: ['components', 'libs', 'commons', 'core', 'utils', 'vendors', 'manifest'],
			filename: "[name].js"
		}),
		// 抽出CSS
		new ExtractTextPlugin("[name].css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				ROUTE_HISTORY: JSON.stringify("hash")
			}
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			title: "Learning React",
			minify: {
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency',
			inject: true
		})
	],
	devServer: {
		hot: true,
		inline: true
	},
	performance: {
		hints: false
	},
	// externals: {
	// 	React: "React",
	// 	react: "React",
	// 	"window.react": "React",
	// 	"window.React": "React",
	// 	ReactDOM: "ReactDOM",
	// 	reactDOM: "ReactDOM",
	// 	"react-dom": "ReactDOM",
	// 	"window.ReactDOM": "ReactDOM",
	// 	"window.reactDOM": "ReactDOM",
	// 	ReactRouter: "ReactRouter",
	// 	reactRouter: "ReactRouter",
	// 	"react-router": "ReactRouter",
	// 	"window.ReactRouter": "ReactRouter",
	// 	"window.reactRouter": "ReactRouter",
	// }
};

module.exports = settings;
