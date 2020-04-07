# Mocha-Tutorial
![LambdaTest Logo](https://www.lambdatest.com/images/logo.svg)

![Mocha](https://www.lambdatest.com/blog/wp-content/uploads/2019/07/Front-end-development-frameworks-3-768x230.png)

**Automate** your **acceptance tests** and run them in **real browsers!**

## Prerequisites for Mocha tutorial for Selenium and JavaScript
* **Node.js and 
Package Manager (npm)** : Install Node.js from [here](https://nodejs.org/en/#home-downloadhead) Or Install Node.js with [Homebrew](http://brew.sh/)
```
$ brew install node
```
* **Mocha Package Module** :  <code>npm</code> to install Mocha
```
$ npm init
```
Install the Mocha using npm 
```
$ npm install -g mocha 
```
<code>npm</code> to install Mocha in <code>./node_modules/.bin folder</code>
```
$ npm install --save-dev mocha
```

* **LambdaTest Credentials**
   * Set LambdaTest username and access key in environment variables. It can be obtained from [LambdaTest Automation Dashboard](https://automation.lambdatest.com/)    
    example:
   - For linux/mac
    ```
    export LT_USERNAME="YOUR_USERNAME"
    export LT_ACCESS_KEY="YOUR ACCESS KEY"

    ```
    - For Windows
    ```
    set LT_USERNAME="YOUR_USERNAME"
    set LT_ACCESS_KEY="YOUR ACCESS KEY"

    ```
3. Setup
   * Clone the repo
   * Install dependencies `npm install`
   * Update `*.conf.js` files inside the `conf/` directory with your LambdaTest Username and Access Key

## Executing Mocha JavaScript Testing

We will create a project directory named mocha_test and then we will create a subfolder name scripts with a test script name single_test.js inside it.

Finally, we will initialize our project by hitting the command npm init. This will create a package.json file in an interactive way, which will contain all our required project configurations. It will be required to execute our test script <code>single_test.js</code>.

```
mocha_selenium_sample
        | -- specs
                    | -- single_test.js
        | -- package.json
{
  "name": "mocha-selenium-sample",
  "version": "0.0.1",
  "description": " Selenium examples for Mocha and LambdaTest",
  "scripts": {
    "test": "npm run single && npm run parallel",
    "single": "./node_modules/.bin/mocha specs/single_test.js conf/single.conf.js",
    "parallel": "./node_modules/.bin/mocha specs/parallel_test.js conf/parallel.conf.js --timeout=100000"
  },
  "keywords": [
    "mocha",
    "LambdaTest",
    "selenium",
    "examples"
  ],
  "dependencies": {
    "bluebird": "^3.4.6",
    "mocha": "^6.2.0",
    "selenium-webdriver": "^3.0.0-beta-3"
  }
}

```
### Test Scenario

In our demonstration, we will be creating a script that uses the Selenium WebDriver to make a search and open a website and assert whether the correct website is open. If assert returns true, it indicates that the test case passed successfully and will show up in the automation logs dashboard else if assert returns false, the test case fails, and the errors will be displayed in the automation logs.

* **Single Test**- On a single environment (Windows 10) and single browser (Chrome)

You have successfully configured your project and are ready to execute your first Mocha JavaScript testing script. Here is the first JavaScript for Mocha Testing. Lets call it <code>single_test.js</code>.

```
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

describe("Google's Search Functionality for " + caps.browserName, function() {
  var driver;
  this.timeout(0);

  beforeEach(function(done) {
    caps.name = this.currentTest.title;
    driver = buildDriver(caps);
    done();
  });

  it("can find search results", function(done) {
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
Now we have a first script ready. Let us specify the capabilituies to run the script on LambdaTest cloud-based Selenium Grid.
```
LT_USERNAME = process.env.LT_USERNAME || "<your username>";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

exports.capabilities = {
  'build': 'Mocha-Selenium-Sample', //Build name
  'name': 'Your Test Name', // Test name
  'platform':'Windows 10', // OS name
  'browserName': 'chrome', // Browser name
  'version': '73.0', // Browser version
  'visual': false,  // To take step by step screenshot
  'network':false,  // To capture network Logs
  'console':false, // To capture console logs.
  'tunnel': false // If you want to run the localhost than change it to true
  };
```
## Parallel Testing for Mocha JavaScript

Will use the same test script over different configration to demonstarte parallel testing. Parallel testing with Mocha will help you to run multiple test cases simultaneously.

* **Parallel Test**- Here is JavaScript file to run Mocha Testing on a parallel environment i.e. different operating system (Windows 10 and Mac OS Catalina) and different browsers (Chrome, Mozilla Firefox, and Safari).


```
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

```

Now lets define the capabilities. Since, we are performig parallel testing over different configrations we will make use of <code>multiCapabilities[]</code>.

```
LT_USERNAME = process.env.LT_USERNAME || "<your username>";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

var config = {
  commanCapabilities: {
    build: "Mocha-Selenium-Sample", //Build name
    tunnel: false // Make it true to run the localhost through tunnel
  },
  multiCapabilities: [
    {
      // Desired capabilities
      name: "Your Test Name", // Test name
      platform: "Windows 10", // OS name
      browserName: "firefox",
      version: "66.0",
      visual: false, // To take step by step screenshot
      network: false, // To capture network Logs
      console: false // To capture console logs.
    },
    {
      name: "Your Test Name", // Test name
      platform: "Windows 10", // OS name
      browserName: "chrome",
      version: "75.0",
      visual: false, // To take step by step screenshot
      network: false, // To capture network Logs
      console: false // To capture console logs.
    }
  ]
};

exports.capabilities = [];
// Code to support common capabilities
config.multiCapabilities.forEach(function(caps) {
  var temp_caps = JSON.parse(JSON.stringify(config.commanCapabilities));
  for (var i in caps) temp_caps[i] = caps[i];
  exports.capabilities.push(temp_caps);
});

```


## Running your tests
- To run a single test, run `npm run single`
- To run parallel tests, run `npm run parallel`

 Know how many concurrent sessions needed by using our [Concurrency Test Calculator](https://www.lambdatest.com/concurrency-calculator?ref=github)
 
 Output from the command line
 
![ouptput](https://www.lambdatest.com/blog/wp-content/uploads/2020/01/outputcode.png)

Below we see a screenshot that depicts our Mocha code is running over different browsers i.e Chrome, Firefox and Safari on the LambdaTest Selenium Grid Platform. The results of the test script execution along with the logs can be accessed from the LambdaTest Automation dashboard.

![Automation-Dashboard](https://www.lambdatest.com/blog/wp-content/uploads/2020/01/automationdashboard.png)

 ###  Routing traffic through your local machine
 - Set tunnel value to `true` in test capabilities
 > OS specific instructions to download and setup tunnel binary can be found at the following links.
 >    - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
 >    - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
 >    - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)

 ### Important Note:
 Some Safari & IE browsers, doesn't support automatic resolution of the URL string "localhost". Therefore if you test on URLs like "http://localhost/" or "http://localhost:8080" etc, you would get an error in these browsers. A possible solution is to use "localhost.lambdatest.com" or replace the string "localhost" with machine IP address. For example if you wanted to test "http://localhost/dashboard" or, and your machine IP is 192.168.2.6 you can instead test on "http://192.168.2.6/dashboard" or "http://localhost.lambdatest.com/dashboard".


## Notes
* You can view your test results on the [LambdaTest Automation Dashboard](https://www.automation.lambdatest.com)
* To test on a different set of browsers, check out our [capabilities generator](https://www.lambdatest.com/capabilities-generator)

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.

## Resources
### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)
### [Mocha Documentation](https://mochajs.org/)
