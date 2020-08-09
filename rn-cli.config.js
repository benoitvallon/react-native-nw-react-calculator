const path = require('path');

// Don't forget to everything listed here to `package.json`
// modulePathIgnorePatterns.
const sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,

  'downstream/core/invariant.js',

  /website\/node_modules\/.*/,

  // TODO(jkassens, #9876132): Remove this rule when it's no longer needed.
  'Libraries/Relay/relay/tools/relayUnstableBatchedUpdates.js'
];

const platformBlacklists = {
  web: ['.ios.js', '.android.js'],
  ios: [
    '.web.js',
    //    '.android.js',
    /node_modules\/react-native-macos\/.*/
  ],
  android: ['.web.js', '.ios.js', /node_modules\/react-native-macos\/.*/],
  macos: ['.ios.js', '.android.js', /node_modules\/react-native\/.*/]
};

function escapeRegExp(pattern) {
  if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
    return pattern.source.replace(/\//g, path.sep);
  } else if (typeof pattern === 'string') {
    const escaped = pattern.replace(
      /[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      '\\$&'
    );
    // convert the '/' into an escaped local file separator
    return escaped.replace(/\//g, `\\${path.sep}`);
  }
  throw new Error(`Unexpected packager blacklist pattern: ${pattern}`);
}

function blacklist(platform, additionalBlacklist) {
  // eslint-disable-next-line
  return new RegExp(
    '(' +
      (additionalBlacklist || [])
        .concat(sharedBlacklist)
        .concat(platformBlacklists[platform] || [])
        .map(escapeRegExp)
        .join('|') +
      ')$'
  );
}

var config = {
  getBlacklistRE(platform) {
    if (
      process &&
      process.argv.filter(a => a.indexOf('react-native-macos') > -1).length > 0
    ) {
      return blacklist('macos', [
        /react\-native\-nw\-react\-calculator.+\/node_modules\/fbjs.*/
      ]);
    }
    return blacklist(platform, [
      /react\-native\-nw\-react\-calculator.+\/node_modules\/fbjs.*/
    ]);
  }
};
module.exports = config;
