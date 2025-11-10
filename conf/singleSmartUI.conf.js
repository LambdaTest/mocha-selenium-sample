
LT_USERNAME = process.env.LT_USERNAME || "<your username>";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "<your accessKey>";

exports.capabilities = {
  browserName: 'chrome',
  'lt:options': {
    build: 'SmartUI-Mocha-Selenium-Sample',
    name: 'Your Test Name',
    project: 'mocha-selenium',
    'smartUI.project': 'mocha-selenium'
  }
};