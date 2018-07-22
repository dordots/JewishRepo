module.exports = function() {
  return {
    events: require('./server-data/events.db'),
    synagogues: require('./server-data/synagogues.db')
  }
};
