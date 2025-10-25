// Libraries
const Manager = new (require('ultimate-jekyll-manager/build'));
const logger = Manager.logger('middleware:request');

// Hook
module.exports = async (context) => {
  // Destructure context
  const { req, res, pathname } = context;

  // Log
  // logger.log(`Processing request for ${pathname}`);
}
