const moment = require('moment');

const Utility = {
  getToday,
};

function getToday() {
  return moment().format('YYYY-MM-DD');
}

module.exports = Utility;
