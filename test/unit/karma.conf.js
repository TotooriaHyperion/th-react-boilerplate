/**
 * Created by Totooria Hyperion on 2017/3/20.
 */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../../build/baseConfig');
// const utils = require('../../build/utils');
const webpack = require('webpack');
const projectRoot = path.resolve(__dirname, '../../');

let webpackConfig = merge(baseConfig,{

});

delete webpackConfig.entry;

module.exports = function (config) {
	config.set({
		// to run in additional browsers:
		// 1. install corresponding karma launcher
		//    http://karma-runner.github.io/0.13/config/browsers.html
		// 2. add it to the `browsers` array below.
		browsers: ['PhantomJS'],
		frameworks: ['mocha', 'sinon-chai'],
		reporters: ['spec', 'coverage'],
		files: [
			'../../node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
			'./index.js'
		],
		preprocessors: {
			'./index.js': ['webpack', 'sourcemap']
		},
		// plugins: [
		// 	require('karma-webpack'),
		// 	require('karma-jasmine'),
		// 	require('karma-phantomjs-launcher'),
		// 	require('karma-sourcemap-loader'),
		// 	require('karma-spec-reporter')
		// ],
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true
		},
		coverageReporter: {
			dir: './coverage',
			reporters: [
				{ type: 'lcov', subdir: '.' },
				{ type: 'text-summary' }
			]
		}
	})
};