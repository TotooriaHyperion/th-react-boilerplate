"use strict";
const webpack = require('webpack');
const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

function getAllFileArray(dirname) {
	return fs.readdirSync(dirname).reduce(function (prev, current) {
		if (!fs.statSync(path.join(dirname, current)).isDirectory()) {
			prev.push(path.join(dirname, current));
		}
		return prev;
	}, []);
}

let settings = {
	devtool: "source-map",
	entry: {
		app: ['whatwg-fetch', path.resolve(__dirname, "../src/index.tsx")],
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
		path: path.resolve(__dirname, "../dist"),
		filename: '/js/[name]-[chunkhash:8].js',
		chunkFilename: "/js/[id][chunkhash:8].js",
		sourceMapFilename: "[file].map"
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
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: ["css-loader?importLoaders=1", "postcss-loader", "sass-loader"]
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
		// moment的国际化支持只保留中文和英文
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|cn/),
		// 抽出公共模块，manifest用来解决最后一个文件chunkhash不稳定的问题
		new webpack.optimize.CommonsChunkPlugin({
			names: ['components', 'libs', 'commons', 'core', 'utils', 'vendors', 'manifest'],
			filename: "/js/[name]-[chunkhash:8].js"
		}),
		// 抽出CSS
		new ExtractTextPlugin("/css/[name]-[contenthash:8].css"),
		new CleanPlugin(['dist'], {
			root: path.resolve(__dirname, '../'),
			verbose: true,
			dry: false
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				ROUTE_HISTORY: JSON.stringify("browser")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				warnings: false,
				screw_ie8: true
			},
			comments: false
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
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
	performance: {
		hints: false
	},
	// externals: {
	// 	"react": "React",
	// 	"react-dom": "ReactDOM",
	// 	"react-router": "ReactRouter"
	// }
};

module.exports = settings;
