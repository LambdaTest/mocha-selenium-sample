var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  conf_file = process.argv[3] || "conf/single.conf.js";

var capabilities = require("../" + conf_file).capabilities;

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

capabilities.forEach(function(caps) {
 
  describe("Google's Search Functionality for " + caps.browserName, function() {
    var driver;
    this.timeout(0);

    beforeEach(function(done) {
      caps.name = this.currentTest.title;
      driver = buildDriver(caps);
      done();
    });

    it("can find search results" + caps.browserName, function(done) {
      driver.get("https://www.lambdatest.com").then(function() {
        driver.getTitle().then(function(title) {
          setTimeout(function() {
            console.log(title);
            assert(
              title.match(
                "Cross Browser Testing Tools | Test Your Website on Different Browsers | LambdaTest"
              ) != null
            );
            done();
          }, 10000);
        });
      });
    });

    afterEach(function(done) {
      if (this.currentTest.isPassed) {
        driver.executeScript("lambda-status=passed");
      } else {
        driver.executeScript("lambda-status=failed");
      }
      driver.quit().then(function() {
        done();
      });
    });
  });
});
