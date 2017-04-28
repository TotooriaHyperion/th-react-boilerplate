/**
 * Created by Totooria Hyperion on 2017/3/13.
 */

const spawn = require('cross-spawn');
const path = require('path');

let opts = [];
opts = opts.concat(['--config', path.resolve(__dirname, './nightwatch.conf.js')]);
// opts = opts.concat(['--env', 'chrome']);

const browsers = ['chrome', 'firefox', 'edge', 'ie', 'phantomjs'];

let o;
o = opts.concat(['--env']);
o = o.concat(browsers.join(","));
// browsers.forEach(function (item) {
// 	o.concat([item])
// 	// exec("nightwatch " + o.join(" "));
// 	// exec("nightwatch " + o.join(" "));
// });
o = o.concat(['--reporter', path.resolve(__dirname, './html-reporter.js')]);
spawn.sync(path.resolve(__dirname, '../../node_modules/.bin/nightwatch'), o, {stdio: 'inherit'});