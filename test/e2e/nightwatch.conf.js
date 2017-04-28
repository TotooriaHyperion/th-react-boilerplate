/**
 * Created by Totooria Hyperion on 2017/3/13.
 */
"use strict";
require('babel-register');
const config = require('../../config');
const path = require("path");

// http://nightwatchjs.org/guide#settings-file
module.exports = {
	src_folders: [path.resolve(__dirname,'./specs')],
	output_folder: path.resolve(__dirname,'./reports'),
	custom_assertions_path: [path.resolve(__dirname,'./custom_assertions')],

	selenium: {
		start_process: true,
		server_path: path.resolve(__dirname,'../../selenium/selenium-server-standalone-3.3.1.jar'),
		host: '127.0.0.1',
		port: 64476,
		cli_args: {
			'webdriver.chrome.driver': path.resolve(__dirname,"../../selenium/chromedriver.exe"),
			'webdriver.gecko.driver': path.resolve(__dirname,"../../selenium/geckodriver.exe"),
			'webdriver.edge.driver': path.resolve(__dirname,"../../selenium/MicrosoftWebDriver.exe"),
			'webdriver.ie.driver': path.resolve(__dirname,"../../selenium/IEDriverServer.exe"),
			// 'webdriver.opera.driver': path.resolve(__dirname,"../../selenium/operadriver.exe"),
			'webdriver.phantomjs.driver': path.resolve(__dirname,"../../selenium/phantomjs.exe"),
		}
	},

	test_settings: {
		default: {
			selenium_port: 64476,
			selenium_host: 'localhost',
			silent: true,
			globals: {
				// devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
				devServerURL: "http://localhost:9091/"
			},
			screenshots: {
				enabled : true,
				on_failure : true,
				on_error : false,
				path : path.resolve(__dirname,"./reports/screenshots")
			}
		},

		chrome: {
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				acceptSslCerts: true
			}
		},

		firefox: {
			desiredCapabilities: {
				browserName: 'firefox',
				javascriptEnabled: true,
				acceptSslCerts: true
			}
		},

		edge: {
			desiredCapabilities: {
				browserName: 'MicrosoftEdge',
				javascriptEnabled: true,
				acceptSslCerts: true
			}
		},

		ie: {
			desiredCapabilities: {
				browserName: 'internet explorer',
				javascriptEnabled: true,
				acceptSslCerts: true
			}
		},

		// opera: {
		// 	desiredCapabilities: {
		// 		browserName: 'opera',
		// 		javascriptEnabled: true,
		// 		"opera.binary": path.resolve(__dirname,"../../selenium/operadriver.exe"),
		// 		acceptSslCerts: true
		// 	}
		// },

		phantomjs: {
			desiredCapabilities: {
				browserName: 'phantomjs',
				"phantomjs.binary.path": path.resolve(__dirname,"../../selenium/phantomjs.exe"),
				javascriptEnabled: true,
				acceptSslCerts: true
			}
		}
	}
};
