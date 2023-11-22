/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema
    .createTable('table1', (table) => {
      table.increments('id');
      table.integer('week').notNullable();
      table.string('type').notNullable();
      table.string('title').notNullable();
      table.text('url').notNullable();
      table.text('memo');
      table.text('goal');
    })
    .createTable('table2', (table) => {
      table.increments('id');
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('memo');
      table.string('url');
    })
    .createTable('table3', (table) => {
      table.increments('id');
      table.string('assess_no').notNullable();
      table.string('question').notNullable();
      table.string('answer').notNullable();
      table.string('memo');
      table.string('url');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('table1')
    .dropTableIfExists('table2')
    .dropTableIfExists('table3');
};
