/**
 * Created by Totooria Hyperion on 2017/3/13.
 */

const spawn = require('cross-spawn');
const path = require('path');
const exec = require('child_process').exec;

let opts = [];
opts = opts.concat(['--config', path.resolve(__dirname,'./nightwatch.conf.js')]);
// opts = opts.concat(['--env', 'chrome']);

const browsers = ['chrome','firefox','edge','ie','phantomjs'];

browsers.forEach(function (item) {
	let o = opts.concat(['--env', item]);
	spawn.sync(path.resolve(__dirname,'../../node_modules/.bin/nightwatch'), o, { stdio: 'inherit' });
	// exec("nightwatch " + o.join(" "));
	// exec("nightwatch " + o.join(" "));
});