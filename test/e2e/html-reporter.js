/**
 * Created by Totooria Hyperion on 2017/3/14.
 */
const HtmlReporter = require('nightwatch-html-reporter');
const path = require('path');

const fileNameSettingPos = process.argv.findIndex(function (item) {
	return item == "--reporterFileName";
});
const fileName = process.argv[fileNameSettingPos + 1];

function dateFmt(fmt,date) {
	let a = date || new Date();
	let o = {
		"M+": a.getMonth() + 1, //月份
		"d+": a.getDate(), //日
		"h+": a.getHours(), //小时
		"m+": a.getMinutes(), //分
		"s+": a.getSeconds(), //秒
		"q+": Math.floor((a.getMonth() + 3) / 3), //季度
		"S": a.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o){
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	}
	return fmt;
}

module.exports = {
	write: function (results, options, done) {
		let reporter = new HtmlReporter({
			openBrowser: false,
			reportsDirectory: path.resolve(__dirname, './reports'),
			themeName: "cover",
			reportFilename: dateFmt("yyyy-MM-dd_hh时mm分ss秒") + "_" + options.filename_prefix.slice(0,-1)
		});
		reporter.fn(results, done);
	}
};