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
	devtool: "hidden-source-map",
	entry: {
		app: ['whatwg-fetch', path.resolve(__dirname, "./index.tsx")],
		libs: [].concat(getAllFileArray(path.resolve(__dirname, './lib/'))),
		commons: [].concat(getAllFileArray(path.resolve(__dirname, './util/')))
			.concat(getAllFileArray(path.resolve(__dirname, './constants/')))
			.concat([]),
		core: [
			path.resolve(__dirname, "./core/index"),
			path.resolve(__dirname, "./core/rootReducers"),
			path.resolve(__dirname, "./core/ReduxConnector"),
			path.resolve(__dirname, "./core/ReduxComponent")
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
		sourceMapFilename: "/thshr[file].map"
	},
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
					fallbackLoader: "style-loader",
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
				NODE_ENV: JSON.stringify("production"),
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
			template: path.resolve(__dirname, 'index.html'),
			title: "Learning React",
			minify: {
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency',
			inject: true
		})
	],
	performance: {
		// maxEntrypointSize: 400000,
		hints: false
	},
	// externals: {
	// 	"react": "React",
	// 	"react-dom": "ReactDOM",
	// 	"react-router": "ReactRouter"
	// }
};

module.exports = settings;
