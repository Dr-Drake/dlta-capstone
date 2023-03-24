const { readFileSync } = require('fs');
const { extname } = require('path');

module.exports = {
  process(src, filename) {
    if (extname(filename) === '.svg') {
      return `module.exports = '${readFileSync(filename, 'utf8')}'`;
    }
    return `module.exports = ${JSON.stringify(src)};`;
  },
};
