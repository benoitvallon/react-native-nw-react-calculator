var blacklist = require('react-native/packager/blacklist');
var config = {
  getBlacklistRE(platform) {
    return blacklist(platform,[/react\-native\-nw\-react\-calculator.+\/node_modules\/fbjs.*/]);
  }
};
module.exports = config;
