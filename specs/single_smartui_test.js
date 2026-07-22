var assert = require("assert"),
    webdriver = require("selenium-webdriver"),
    conf_file = process.argv[3] || "conf/single.conf.js";

var caps = require("../" + conf_file).capabilities;

var buildDriver = function (caps) {
    return new webdriver.Builder()
        .usingServer(
            "http://" +
            LT_USERNAME +
            ":" +
            LT_ACCESS_KEY +
            "@hub.lambdatest.com/wd/hub"
        )
        .withCapabilities(caps)
        .build();
};

describe("Mocha Todo Test " + caps.browserName, function () {
    var driver;
    this.timeout(0);

    beforeEach(function () {
        caps.name = this.currentTest.title;
        driver = buildDriver(caps);
    });

    it("can find search results", async function () {
        await driver.get("https://www.testmuai.com/selenium-playground/todo-app/");

        await driver.findElement(webdriver.By.name('li1')).click();
        console.log("Successfully clicked first list item.");

        await driver.findElement(webdriver.By.name('li2')).click();
        console.log("Successfully clicked second list item.");

        await driver.findElement(webdriver.By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial\n');
        await driver.findElement(webdriver.By.id('addbutton')).click();
        console.log("Successfully added a new task.");

        // Hook to take SmartUI snapshot
        await driver.executeScript(`smartui.takeScreenshot=mocha-selenium`);

        await driver.quit();
    });
});
