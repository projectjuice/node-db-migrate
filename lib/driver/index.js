var log = require('../log');

exports.connect = function(config, callback) {
  if (config.driver === undefined) {
    throw new Error('config must include a driver key specifying which driver to use');
  }

  var req = './' + config.driver;
  if (process.env.POSTGRES_SSL)
    config.ssl = true;

  log.verbose('require:', req);
  var driver = require(req);
  log.verbose('connecting', config);


  driver.connect(config, function(err, db) {
    if (err) { callback(err); return; }
    log.verbose('connected');
    callback(null, db);
  });
};
