
LT_USERNAME = process.env.LT_USERNAME || "<your username>";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

exports.capabilities = {
  'build': 'SmartUI-Mocha-Selenium-Sample', //Build name
  'name': 'Your Test Name', // Test name
  'browserName': 'chrome', // Browser name
  'smartUI.project': 'mocha-selenium'
  };