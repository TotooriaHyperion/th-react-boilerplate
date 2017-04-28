/**
 * Created by Totooria Hyperion on 2017/3/13.
 */
module.exports = {
	"test_baidu": function (browser) {
		// const devServer = browser.globals.devServerURL;
		const devServer = "https://www.baidu.com";

		let count = 0;

		browser
			.url(devServer)
			.waitForElementVisible('.s_ipt', 5000)
			// .waitForElementVisible('.e2e_inc', 5000)
			.setValue(".s_ipt","人渣の本愿")
			// .getText(".e2e_count",function (res) {
			// 	count = Number(res);
			// })
			.click(".s_btn")
			// .click(".e2e_inc");
		// browser.expect.element(".e2e_count").text.to.equal(count + 1);
		// browser
			.pause(1000)
			// .assert.title("人渣の本愿_百度搜索")
			.assert.title("人渣的本愿_百度搜索")
			.end()
	}
};