const JSON = require('./json/table3.json');

exports.seed = function (knex) {
  return knex('table3')
    .del()
    .then(() => {
      return knex('table3').insert(JSON);
    });
};
