var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  conf_file = process.argv[3] || "conf/single.conf.js";

var caps = require("../" + conf_file).capabilities;

var buildDriver = function(caps) {
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

describe("Mocha Todo Test " + caps.browserName, function() {
  var driver;
  this.timeout(0);

  beforeEach(function(done) {
    caps.name = this.currentTest.title;
    driver = buildDriver(caps);
    done();
  });

  it("can find search results", function(done) {
    driver.get("https://lambdatest.github.io/sample-todo-app/").then(function() {
        driver.findElement(webdriver.By.name('li1')).click().then(function(){
            console.log("Successfully clicked first list item.");
        });

        driver.findElement(webdriver.By.name('li2')).click().then(function(){
            console.log("Successfully clicked second list item.");
          });

        driver.findElement(webdriver.By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial\n').then(function(){
            driver.findElement(webdriver.By.id('addbutton')).click().then(function(){
                console.log("Successfully added a new task.");
            })
        });
    });
  });

  afterEach(function(done) {
    if (this.currentTest.isPassed()) {
      driver.executeScript("lambda-status=passed");
    } else {
      driver.executeScript("lambda-status=failed");
    }
    driver.quit().then(function() {
      done();
    });
  });
});
