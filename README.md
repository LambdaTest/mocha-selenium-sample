# Mocha-Tutorial

![Mocha](https://www.lambdatest.com/blog/wp-content/uploads/2019/07/Front-end-development-frameworks-3-768x230.png)
**Automate** your **acceptance tests** and run them in **real browsers!**

## Prerequisites

1. Install npm.

```
sudo apt install npm
```

2. Install NodeJS.

```
sudo apt install nodejs
```

## Steps to Run your First Test

Step 1. Clone the NodeJs Selenium Repository.

```
git clone https://github.com/LambdaTest/mocha-selenium-sample.git
```

Step 2. Export the Lambda-test Credentials. You can get these from your automation dashboard.

<p align="center">
   <b>For Linux/macOS:</b>

```
export LT_USERNAME="YOUR_USERNAME"
export LT_ACCESS_KEY="YOUR ACCESS KEY"
```

<p align="center">
   <b>For Windows:</b>

```
set LT_USERNAME="YOUR_USERNAME"
set LT_ACCESS_KEY="YOUR ACCESS KEY"
```

Step 3. Inside mocha-selenium-sample folder install necessary packages.

```
cd mocha-selenium-sample
npm i
```

Step 4. To run your First Test.

```
npm run single
```

## See the Results

You can check your test results on the [Automation Dashboard](https://automation.lambdatest.com/build).
![Automation Testing Logs](https://github.com/LambdaTest/nodejs-selenium-sample/blob/master/tutorial-images/automation%20testing%20logs.PNG)

## Understanding single_test.js

1. Import the necessary packages and configuration from single.conf.js file.

```
var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  conf_file = process.argv[3] || "conf/single.conf.js";

var caps = require("../" + conf_file).capabilities;
```

2. Create the selenium webdriver object.

```
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
```

3. Describe the test fucntion that opens lambdatest.com in the browser.

```
describe("Google's Search Functionality for " + caps.browserName, function() {
  var driver;
  this.timeout(0);

  beforeEach(function(done) {
    caps.name = this.currentTest.title;
    driver = buildDriver(caps);
    done();
  });

  it("Can find search results", function(done) {
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
```

## Executing Mocha Test parallely

1. Will use the same test script over different configration to demonstarte parallel testing. Parallel testing with Mocha will help you to run multiple test cases simultaneously.

```
npm run parallel
```

## Understanding parallel_test.js

1. Firstly, import the necessary packages and configuration from parallel.conf.js file.

```
var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  conf_file = process.argv[3] || "conf/single.conf.js";

var capabilities = require("../" + conf_file).capabilities;
```

2. Next, we initialize the selenium webdriver object.

```
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
```

3. At last, we loop through the list of capabilities and run each test parallely.

```
capabilities.forEach(function(caps) {

  describe("Google's Search Functionality for " + caps.browserName, function() {
    var driver;
    this.timeout(0);

    beforeEach(function(done) {
      caps.name = this.currentTest.title;
      driver = buildDriver(caps);
      done();
    });

    it("Can find search results" + caps.browserName, function(done) {
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
```

## Console Output

![ouptput](https://www.lambdatest.com/blog/wp-content/uploads/2020/01/outputcode.png)

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.

## Resources

### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)

### [Mocha Documentation](https://mochajs.org/)
