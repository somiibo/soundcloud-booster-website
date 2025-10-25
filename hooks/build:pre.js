// Libraries
const Manager = new (require('ultimate-jekyll-manager/build'));
const logger = Manager.logger('build:pre');

// Hook
module.exports = async (index) => {
  logger.log('Running with index =', index);
}
