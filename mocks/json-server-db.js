module.exports = function() {
  return {
    event: require('./server-data/events.db'),
    synagogue: require('./server-data/synagogues.db')
  }
};
