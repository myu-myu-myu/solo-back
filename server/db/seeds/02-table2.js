const JSON = require('./json/table2.json');

exports.seed = function (knex) {
  return knex('table2')
    .del()
    .then(() => {
      return knex('table2').insert(JSON);
    });
};
