const JSON = require('./json/table1.json');

exports.seed = function (knex) {
  return knex('table1')
    .del()
    .then(() => {
      return knex('table1').insert(JSON);
    });
};
